"use server"

import { Resend } from "resend"
import nodemailer from "nodemailer"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// SMTP configuration for direct email sending
const createSMTPTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER || 'info@mastercleanservice.nl',
      pass: process.env.EMAIL_PASS as string | undefined,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
}

export async function submitContactForm(formData: FormData) {
  console.log("=== CONTACT FORM SUBMISSION START ===")

  // Get form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const message = formData.get("message") as string

  console.log("Form data received:", { name, email, phone: !!phone, message: !!message })

  // Process uploaded files
  const files: { name: string; content: string; type: string; size: number }[] = []
  const fileEntries = Array.from(formData.entries()).filter(([key]) => key.startsWith("file_"))

  for (const [key, value] of fileEntries) {
    if (value instanceof File && value.size > 0) {
      try {
        const arrayBuffer = await value.arrayBuffer()
        const base64Content = Buffer.from(arrayBuffer).toString("base64")

        files.push({
          name: value.name,
          content: base64Content,
          type: value.type,
          size: value.size,
        })

        console.log(`File processed: ${value.name} (${value.size} bytes)`)
      } catch (error) {
        console.error(`Error processing file ${value.name}:`, error)
      }
    }
  }

  console.log(`Total files processed: ${files.length}`)

  // Basic validation
  if (!name || !email || !message) {
    console.log("Validation failed: missing required fields")
    return {
      success: false,
      error: "Naam, email en bericht zijn verplichte velden",
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    console.log("Validation failed: invalid email format")
    return {
      success: false,
      error: "Ongeldig emailadres",
    }
  }

  // Try direct email solution first
  console.log("🔄 Attempting to send email via direct method...")
  
  // Use a simple webhook solution that will work reliably
  return await sendEmailDirectly({ name, email, phone, message, files })
}

// Direct email function: try Resend, then SMTP
async function sendEmailDirectly({ name, email, phone, message, files }: {
  name: string
  email: string
  phone?: string
  message: string
  files: any[]
}) {
  try {
    // 1) Resend (only if a valid key is present)
    const hasResendValid = typeof process.env.RESEND_API_KEY === 'string' && process.env.RESEND_API_KEY.startsWith('re_')
    if (hasResendValid && resend) {
      console.log("Attempting to send email via Resend...")

      const attachments = files.map((file) => ({
        filename: file.name,
        content: file.content,
        type: file.type,
        disposition: "attachment",
      }))

      await resend.emails.send({
        from: "MasterClean Contact Form <onboarding@resend.dev>",
        to: ["info@mastercleanservice.nl"],
        reply_to: email,
        subject: `Nieuwe contactaanvraag van ${name}`,
        html: `
          <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">\n            <h2 style=\"color: #2563eb;\">Nieuwe Contactaanvraag - MasterClean</h2>\n            <div style=\"background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;\">\n              <h3>Contactgegevens:</h3>\n              <p><strong>Naam:</strong> ${name}</p>\n              <p><strong>Email:</strong> ${email}</p>\n              <p><strong>Telefoon:</strong> ${phone || "Niet opgegeven"}</p>\n            </div>\n            <div style=\"background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;\">\n              <h3>Bericht:</h3>\n              <p style=\"white-space: pre-wrap;\">${message}</p>\n            </div>\n          </div>\n        `,
        attachments: attachments.length > 0 ? attachments : undefined,
      })

      console.log("✅ Email sent successfully via Resend")
      return { success: true, message: "Bedankt voor uw bericht! Wij nemen zo spoedig mogelijk contact met u op." }
    }

    // 2) SMTP via Nodemailer (Hostinger or other)
    const hasSMTPCreds = !!process.env.EMAIL_HOST && !!process.env.EMAIL_PORT && !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS
    if (hasSMTPCreds) {
      console.log("Attempting to send email via SMTP...",
        {
          SMTP_HOST_PRESENT: !!process.env.EMAIL_HOST,
          SMTP_PORT_PRESENT: !!process.env.EMAIL_PORT,
          SMTP_USER_PRESENT: !!process.env.EMAIL_USER,
          SMTP_PASS_PRESENT: !!process.env.EMAIL_PASS,
        }
      )

      const transporter = createSMTPTransporter()

      const attachments = files.map((file) => ({
        filename: file.name,
        content: Buffer.from(file.content, 'base64'),
        contentType: file.type,
      }))

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Nieuwe Contactaanvraag - MasterClean</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Contactgegevens:</h3>
            <p><strong>Naam:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefoon:</strong> ${phone || 'Niet opgegeven'}</p>
          </div>
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Bericht:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `

      const text = `Nieuwe Contactaanvraag - MasterClean\n\nNaam: ${name}\nEmail: ${email}\nTelefoon: ${phone || 'Niet opgegeven'}\n\nBericht:\n${message}`

      await transporter.sendMail({
        from: `MasterClean Contact Form <${process.env.EMAIL_USER || 'info@mastercleanservice.nl'}>`,
        to: 'info@mastercleanservice.nl',
        replyTo: email,
        subject: `Nieuwe contactaanvraag van ${name}`,
        text,
        html,
        attachments: attachments.length > 0 ? attachments : undefined,
      })

      console.log("✅ Email sent successfully via SMTP")
      return { success: true, message: "Bedankt voor uw bericht! Wij nemen zo spoedig mogelijk contact met u op." }
    }

    // 3) No email service configured: return a helpful error
    console.warn("No email service configured (RESEND_API_KEY or SMTP creds)", {
      hasResendValid,
      SMTP_HOST_PRESENT: !!process.env.EMAIL_HOST,
      SMTP_PORT_PRESENT: !!process.env.EMAIL_PORT,
      SMTP_USER_PRESENT: !!process.env.EMAIL_USER,
      SMTP_PASS_PRESENT: !!process.env.EMAIL_PASS,
    })
    return {
      success: false,
      error: "E-mailservice is niet geconfigureerd. Neem contact op via telefoon of WhatsApp.",
    }

  } catch (error) {
    console.error("❌ Email sending failed:", error)
    return {
      success: false,
      error: "Er is een fout opgetreden. Probeer het opnieuw of bel ons direct.",
    }
  }
}


export async function submitAppointmentForm(formData: FormData) {
  console.log("=== APPOINTMENT FORM SUBMISSION START ===")

  // Get form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const preferredDate = formData.get("preferredDate") as string
  const preferredTime = formData.get("preferredTime") as string
  const serviceType = formData.get("serviceType") as string
  const address = formData.get("address") as string
  const message = formData.get("message") as string

  console.log("Appointment data received:", {
    name,
    email,
    phone: !!phone,
    preferredDate,
    preferredTime,
    serviceType,
    address: !!address,
    message: !!message,
  })

  // Basic validation
  if (!name || !email || !phone || !preferredDate || !preferredTime || !serviceType) {
    console.log("Validation failed: missing required fields")
    return {
      success: false,
      error: "Alle verplichte velden moeten worden ingevuld",
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    console.log("Validation failed: invalid email format")
    return {
      success: false,
      error: "Ongeldig emailadres",
    }
  }

  // Date validation (not in the past)
  const selectedDate = new Date(preferredDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate < today) {
    return {
      success: false,
      error: "De gewenste datum kan niet in het verleden liggen",
    }
  }

  // If Resend is not configured (or invalid key), try SMTP; otherwise report configuration error
  const hasResendValid = typeof process.env.RESEND_API_KEY === 'string' && process.env.RESEND_API_KEY.startsWith('re_')
  if (!hasResendValid) {
    const hasSMTPCreds = !!process.env.EMAIL_HOST && !!process.env.EMAIL_PORT && !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS
    if (hasSMTPCreds) {
      try {
        console.log("Attempting to send appointment email via SMTP...",
          {
            SMTP_HOST_PRESENT: !!process.env.EMAIL_HOST,
            SMTP_PORT_PRESENT: !!process.env.EMAIL_PORT,
            SMTP_USER_PRESENT: !!process.env.EMAIL_USER,
            SMTP_PASS_PRESENT: !!process.env.EMAIL_PASS,
          }
        )

        const transporter = createSMTPTransporter()

        const formattedDate = new Date(preferredDate).toLocaleDateString("nl-NL", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        const formattedTime = preferredTime

        const htmlToOwner = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">🗓️ Nieuwe Afspraakverzoek - MasterClean</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Klantgegevens:</h3>
            <p><strong>Naam:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefoon:</strong> ${phone}</p>
            ${address ? `<p><strong>Adres:</strong> ${address}</p>` : ""}
          </div>
          <div style="background-color: #faf5ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7c3aed;">
            <h3 style="color: #374151; margin-top: 0;">📅 Gewenste Afspraak:</h3>
            <p><strong>Datum:</strong> ${formattedDate}</p>
            <p><strong>Tijd:</strong> ${formattedTime}</p>
            <p><strong>Dienst:</strong> ${serviceType}</p>
          </div>
          ${message ? `<div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;"><h3 style="color: #374151; margin-top: 0;">💬 Aanvullende Informatie:</h3><p style="white-space: pre-wrap;">${message}</p></div>` : ""}
          <p style="color: #6b7280; font-size: 14px;">Verzonden op: ${new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" })}</p>
        </div>`

        const textToOwner = `Nieuwe Afspraakverzoek - MasterClean\n\nNaam: ${name}\nEmail: ${email}\nTelefoon: ${phone}\n${address ? `Adres: ${address}\n` : ''}Datum: ${formattedDate}\nTijd: ${formattedTime}\nDienst: ${serviceType}\n\nBericht:\n${message || '-'}`

        await transporter.sendMail({
          from: `MasterClean <${process.env.EMAIL_USER || 'info@mastercleanservice.nl'}>`,
          to: 'info@mastercleanservice.nl',
          replyTo: email,
          subject: `🗓️ Nieuwe Afspraakverzoek van ${name} - ${formattedDate}`,
          text: textToOwner,
          html: htmlToOwner,
        })

        const htmlToCustomer = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">Bedankt voor uw afspraakverzoek, ${name}!</h2>
          <p>Wij hebben uw verzoek ontvangen en nemen zo snel mogelijk contact met u op om de afspraak te bevestigen.</p>
          <div style="background-color: #faf5ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7c3aed;">
            <h3 style="color: #374151; margin-top: 0;">📅 Uw Afspraakverzoek:</h3>
            <p><strong>Datum:</strong> ${formattedDate}</p>
            <p><strong>Tijd:</strong> ${formattedTime}</p>
            <p><strong>Dienst:</strong> ${serviceType}</p>
            ${address ? `<p><strong>Locatie:</strong> ${address}</p>` : ""}
          </div>
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;"><strong>⏰ Wat gebeurt er nu?</strong><br>Wij nemen binnen 24 uur contact met u op.</p>
          </div>
          <p>Met vriendelijke groet,<br>Het MasterClean Team</p>
        </div>`

        await transporter.sendMail({
          from: `MasterClean <${process.env.EMAIL_USER || 'info@mastercleanservice.nl'}>`,
          to: email,
          subject: 'Afspraakverzoek ontvangen - MasterClean',
          html: htmlToCustomer,
          text: `Bedankt voor uw afspraakverzoek, ${name}! Datum: ${formattedDate}, Tijd: ${formattedTime}, Dienst: ${serviceType}`,
        })

        return {
          success: true,
          message: `Bedankt ${name}! Uw afspraakverzoek voor ${formattedDate} om ${formattedTime} is ontvangen. Wij nemen binnen 24 uur contact met u op om de afspraak te bevestigen.`,
        }
      } catch (smtpError) {
        console.error('❌ Failed to send appointment via SMTP:', smtpError)
        return {
          success: false,
          error: 'Er is een probleem opgetreden bij het verzenden van uw afspraakverzoek. Bel ons direct op +31 (0)85 0805636.',
        }
      }
    }

    console.warn('No email service configured (RESEND_API_KEY or EMAIL_USER/EMAIL_PASS)')
    return {
      success: false,
      error: 'E-mailservice is niet geconfigureerd. Neem contact op via telefoon of WhatsApp.',
    }
  }

  try {
    const hasResendValid = typeof process.env.RESEND_API_KEY === 'string' && process.env.RESEND_API_KEY.startsWith('re_')
    if (!hasResendValid || !resend) {
      return {
        success: false,
        error: "E-mailservice is niet geconfigureerd voor Resend. Gebruik SMTP of configureer RESEND_API_KEY.",
      }
    }
    console.log("Attempting to send appointment email via Resend...")

    // Format date and time for display
    const formattedDate = new Date(preferredDate).toLocaleDateString("nl-NL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const formattedTime = preferredTime

    // Send email to MasterClean
    const emailResult = await resend.emails.send({
      from: "MasterClean <onboarding@resend.dev>",
      to: ["info@mastercleanservice.nl"],
      subject: `🗓️ Nieuwe Afspraakverzoek van ${name} - ${formattedDate}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">🗓️ Nieuwe Afspraakverzoek - MasterClean</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Klantgegevens:</h3>
            <p><strong>Naam:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefoon:</strong> ${phone}</p>
            ${address ? `<p><strong>Adres:</strong> ${address}</p>` : ""}
          </div>
          
          <div style="background-color: #faf5ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7c3aed;">
            <h3 style="color: #374151; margin-top: 0;">📅 Gewenste Afspraak:</h3>
            <p><strong>Datum:</strong> ${formattedDate}</p>
            <p><strong>Tijd:</strong> ${formattedTime}</p>
            <p><strong>Dienst:</strong> ${serviceType}</p>
          </div>
          
          ${
            message
              ? `
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">💬 Aanvullende Informatie:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          `
              : ""
          }
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>⚡ Actie vereist:</strong> Bevestig deze afspraak binnen 24 uur door contact op te nemen met de klant!
            </p>
          </div>
          
          <div style="background-color: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #166534;">
              <strong>📞 Snelle Actie:</strong><br>
              Bel: <a href="tel:${phone}" style="color: #ea580c;">${phone}</a><br>
              WhatsApp: <a href="https://wa.me/${phone.replace(/\D/g, "")}" style="color: #16a34a;">Stuur WhatsApp</a><br>
              Email: <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
            </p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 14px;">
            Dit afspraakverzoek is verzonden via de MasterClean website.<br>
            Verzonden op: ${new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" })}
          </p>
        </div>
      `,
    })

    console.log("✅ Appointment email sent successfully:", emailResult)

    // Send confirmation email to customer
    try {
      await resend.emails.send({
        from: "MasterClean <onboarding@resend.dev>",
        to: [email],
        subject: "Afspraakverzoek ontvangen - MasterClean",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7c3aed;">Bedankt voor uw afspraakverzoek, ${name}!</h2>
            
            <p>Wij hebben uw verzoek voor een afspraak ontvangen en zullen zo snel mogelijk contact met u opnemen om de afspraak te bevestigen.</p>
            
            <div style="background-color: #faf5ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7c3aed;">
              <h3 style="color: #374151; margin-top: 0;">📅 Uw Afspraakverzoek:</h3>
              <p><strong>Datum:</strong> ${formattedDate}</p>
              <p><strong>Tijd:</strong> ${formattedTime}</p>
              <p><strong>Dienst:</strong> ${serviceType}</p>
              ${address ? `<p><strong>Locatie:</strong> ${address}</p>` : ""}
            </div>
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;">
                <strong>⏰ Wat gebeurt er nu?</strong><br>
                Wij nemen binnen 24 uur contact met u op om de afspraak te bevestigen en eventuele details door te spreken.
              </p>
            </div>
            
            <div style="background-color: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #166534;">
                <strong>🚀 Spoed of vragen?</strong><br>
                Bel ons direct: <a href="tel:+31850805636" style="color: #ea580c;">+31 (0)85 0805636</a><br>
                WhatsApp: <a href="https://wa.me/31645087592" style="color: #16a34a;">+31 6 45087592</a>
              </p>
            </div>
            
            <p>Met vriendelijke groet,<br>
            Het MasterClean Team</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <div style="color: #6b7280; font-size: 14px;">
              <p><strong>MasterClean</strong><br>
              Telefoon: +31 (0)85 0805636<br>
              WhatsApp: +31 6 45087592<br>
              Email: info@mastercleanservice.nl<br>
              Werkgebied: Zeeland & Noord-Holland</p>
            </div>
          </div>
        `,
      })
      console.log("✅ Appointment confirmation email sent to customer")
    } catch (confirmationError) {
      console.warn("⚠️ Failed to send appointment confirmation email to customer:", confirmationError)
    }

    return {
      success: true,
      message: `Bedankt ${name}! Uw afspraakverzoek voor ${formattedDate} om ${formattedTime} is ontvangen. Wij nemen binnen 24 uur contact met u op om de afspraak te bevestigen.`,
    }
  } catch (error) {
    console.error("❌ Failed to send appointment email:", error)

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return {
          success: false,
          error: "Email service configuratie probleem. Bel ons direct op +31 (0)85 0805636.",
        }
      }
      if (error.message.includes("rate limit")) {
        return {
          success: false,
          error: "Te veel berichten verzonden. Probeer het over een paar minuten opnieuw of bel +31 (0)85 0805636.",
        }
      }
    }

    return {
      success: false,
      error:
        "Er is een probleem opgetreden bij het verzenden van uw afspraakverzoek. Bel ons direct op +31 (0)85 0805636 of stuur een WhatsApp naar +31 6 45087592.",
    }
  } finally {
    console.log("=== APPOINTMENT FORM SUBMISSION END ===")
  }
}


// Debug function to check environment setup
export async function debugEnvironmentSetup() {
  try {
    console.log("=== ENVIRONMENT DEBUG START ===")
    console.log("NODE_ENV:", process.env.NODE_ENV)

    const apiKey = process.env.RESEND_API_KEY
    const hasApiKey = !!apiKey
    const apiKeyLength = apiKey?.length || 0
    const apiKeyPrefix = apiKey?.substring(0, 3) || ""

    console.log("Has API Key:", hasApiKey)
    console.log("API Key Length:", apiKeyLength)
    console.log("API Key Prefix:", apiKeyPrefix)

    let detectedKeyType = "none"
    let error = null

    if (hasApiKey) {
      if (apiKey.startsWith("re_")) {
        detectedKeyType = "resend"
      } else {
        detectedKeyType = "unknown"
        error = "API key doesn't start with 're_' - this should be a Resend API key"
      }
    } else {
      error = "No RESEND_API_KEY found in environment variables"
    }

    const isConfigured = hasApiKey && apiKey.startsWith("re_") && apiKeyLength > 10

    console.log("=== ENVIRONMENT DEBUG END ===")

    return {
      nodeEnv: process.env.NODE_ENV || "unknown",
      hasApiKey,
      apiKeyLength,
      apiKeyPrefix,
      isConfigured,
      error,
      detectedKeyType,
    }
  } catch (error) {
    console.error("Debug function error:", error)
    return {
      nodeEnv: "unknown",
      hasApiKey: false,
      apiKeyLength: 0,
      apiKeyPrefix: "",
      isConfigured: false,
      error: "Failed to check environment: " + (error instanceof Error ? error.message : "Unknown error"),
      detectedKeyType: "error",
    }
  }
}
