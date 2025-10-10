"use server"

import { Resend } from "resend"
import nodemailer from "nodemailer"

const resend = new Resend(process.env.RESEND_API_KEY || "demo_key")

// SMTP configuration for direct email sending (Hostinger)
const createSMTPTransporter = () => {
  const host = process.env.EMAIL_HOST || "smtp.hostinger.com"
  const port = parseInt(process.env.EMAIL_PORT || "465", 10)
  const secure = port === 465 // Hostinger recommends SSL on 465

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.EMAIL_USER || "info@mastercleanservice.nl",
      pass: process.env.EMAIL_PASS || ""
    },
    tls: {
      // Some environments behind intercepting proxies may need this false
      rejectUnauthorized: false
    }
  })
}

const smtpConfigured = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)

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

  if (!smtpConfigured) {
    console.error("SMTP niet geconfigureerd", {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      userSet: !!process.env.EMAIL_USER,
      passSet: !!process.env.EMAIL_PASS,
    })
    return {
      success: false,
      error: "SMTP niet geconfigureerd. Stel EMAIL_HOST, EMAIL_PORT, EMAIL_USER en EMAIL_PASS in en probeer opnieuw.",
    }
  }

// 1) Try SMTP via Hostinger first
  try {
    if (smtpConfigured) {
      console.log("📮 Sending contact email via SMTP (Hostinger)...")

      const attachments = files.map((file) => ({
        filename: file.name,
        content: Buffer.from(file.content, "base64"),
        contentType: file.type,
      }))

      const fileListHtml =
        files.length > 0
          ? `
      <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">📎 Bijgevoegde Bestanden (${files.length}):</h3>
        <ul style="margin: 0; padding-left: 20px;">
          ${files
            .map(
              (file) => `
            <li style="margin: 5px 0;">
              <strong>${file.name}</strong> 
              <span style="color: #6b7280; font-size: 12px;">
                (${file.type}, ${(file.size / 1024).toFixed(1)} KB)
              </span>
            </li>
          `,
            )
            .join("")}
        </ul>
      </div>
    `
          : ""

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Nieuwe Contactaanvraag - MasterClean</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contactgegevens:</h3>
            <p><strong>Naam:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefoon:</strong> ${phone || "Niet opgegeven"}</p>
          </div>
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Bericht:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          ${fileListHtml}
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>⚡ Actie vereist:</strong> Neem binnen 24 uur contact op met deze klant voor de beste service!
            </p>
          </div>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            Dit bericht is verzonden via het contactformulier op de MasterClean website.<br>
            Verzonden op: ${new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" })}
          </p>
        </div>
      `

      const transporter = createSMTPTransporter()
      const from = process.env.EMAIL_FROM || process.env.EMAIL_USER || "info@mastercleanservice.nl"

      await transporter.verify()

      await transporter.sendMail({
        from,
        to: "info@mastercleanservice.nl",
        replyTo: email,
        subject: `🔵 Nieuwe contactaanvraag van ${name}${files.length > 0 ? ` (${files.length} bijlage${files.length !== 1 ? "s" : ""})` : ""}`,
        html,
        attachments,
      })

      // Confirmation to customer
      await transporter.sendMail({
        from,
        to: email,
        subject: "Bedankt voor uw bericht - MasterClean",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Bedankt voor uw bericht, ${name}!</h2>
            <p>Wij hebben uw bericht ontvangen en zullen zo snel mogelijk contact met u opnemen.</p>
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Uw bericht:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            ${files.length > 0 ? `<div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;"><h3 style="color: #374151; margin-top: 0;">📎 Uw bijgevoegde bestanden:</h3><ul style="margin: 0; padding-left: 20px;">${files.map((file) => `<li style="margin: 5px 0;">${file.name}</li>`).join("")}</ul></div>` : ""}
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;">
                <strong>🚀 Spoed?</strong> Bel ons direct op <a href="tel:+31645087592" style="color: #ea580c;">+31 (0)6 45087592</a> of WhatsApp <a href="https://wa.me/31657211993" style="color: #16a34a;">+31 6 57211993</a>
              </p>
            </div>
          </div>
        `,
      })

      console.log("✅ Contact email sent via SMTP")
      return {
        success: true,
        message: `Bedankt ${name}! Uw bericht${files.length > 0 ? ` met ${files.length} bijlage${files.length !== 1 ? "s" : ""}` : ""} is ontvangen. We nemen binnen 24 uur contact met u op via ${email} of bel ons direct op +31 (0)6 45087592 voor directe hulp.`,
      }
    }
  } catch (e) {
    console.error("SMTP send failed:", e)
    return {
      success: false,
      error: "E-mail kon niet worden verzonden via SMTP. Controleer uw SMTP-instellingen en probeer opnieuw.",
    }
  }

  // No Resend fallback: SMTP only
  try {
    console.log("Attempting to send email via Resend...")

    // Prepare attachments for Resend
    const attachments = files.map((file) => ({
      filename: file.name,
      content: file.content,
      type: file.type,
      disposition: "attachment",
    }))

    // Create file list for email content
    const fileListHtml =
      files.length > 0
        ? `
      <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">📎 Bijgevoegde Bestanden (${files.length}):</h3>
        <ul style="margin: 0; padding-left: 20px;">
          ${files
            .map(
              (file) => `
            <li style="margin: 5px 0;">
              <strong>${file.name}</strong> 
              <span style="color: #6b7280; font-size: 12px;">
                (${file.type}, ${(file.size / 1024).toFixed(1)} KB)
              </span>
            </li>
          `,
            )
            .join("")}
        </ul>
      </div>
    `
        : ""

    // Send email to MasterClean
    const emailResult = await resend.emails.send({
      from: "MasterClean Contact Form <onboarding@resend.dev>", // More descriptive sender name
      to: ["info@mastercleanservice.nl"],
      reply_to: email, // Allow direct reply to customer
      subject: `🔵 Nieuwe contactaanvraag van ${name}${files.length > 0 ? ` (${files.length} bijlage${files.length !== 1 ? "s" : ""})` : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Nieuwe Contactaanvraag - MasterClean</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contactgegevens:</h3>
            <p><strong>Naam:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefoon:</strong> ${phone || "Niet opgegeven"}</p>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Bericht:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          ${fileListHtml}
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>⚡ Actie vereist:</strong> Neem binnen 24 uur contact op met deze klant voor de beste service!
            </p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 14px;">
            Dit bericht is verzonden via het contactformulier op de MasterClean website.<br>
            Verzonden op: ${new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" })}
          </p>
        </div>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    })

    console.log("✅ Email sent successfully:", emailResult)

    // Send confirmation email to customer
    try {
      await resend.emails.send({
        from: "MasterClean <onboarding@resend.dev>",
        to: [email],
        subject: "Bedankt voor uw bericht - MasterClean",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Bedankt voor uw bericht, ${name}!</h2>
            
            <p>Wij hebben uw bericht ontvangen en zullen zo snel mogelijk contact met u opnemen.</p>
            
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Uw bericht:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            
            ${
              files.length > 0
                ? `
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">📎 Uw bijgevoegde bestanden:</h3>
              <ul style="margin: 0; padding-left: 20px;">
                ${files.map((file) => `<li style="margin: 5px 0;">${file.name}</li>`).join("")}
              </ul>
              <p style="color: #6b7280; font-size: 14px; margin-top: 10px;">
                Wij hebben uw bestanden ontvangen en zullen deze bekijken bij het behandelen van uw aanvraag.
              </p>
            </div>
            `
                : ""
            }
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;">
                <strong>🚀 Spoed?</strong> Bel ons direct op <a href="tel:+31645087592" style="color: #ea580c;">+31 (0)6 45087592</a> of WhatsApp <a href="https://wa.me/31657211993" style="color: #16a34a;">+31 6 57211993</a>
              </p>
            </div>
            
            <p>Met vriendelijke groet,<br>
            Het MasterClean Team</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <div style="color: #6b7280; font-size: 14px;">
              <p><strong>MasterClean</strong><br>
Telefoon: +31 (0)6 45087592
              WhatsApp: +31 6 57211993<br>
              Email: info@mastercleanservice.nl<br>
              Werkgebied: Zeeland & Noord-Holland</p>
            </div>
          </div>
        `,
      })
      console.log("✅ Confirmation email sent to customer")
    } catch (confirmationError) {
      console.warn("⚠️ Failed to send confirmation email to customer:", confirmationError)
      // Don't fail the whole process if confirmation email fails
    }

    return {
      success: true,
      message: `Bedankt ${name}! Uw bericht${files.length > 0 ? ` met ${files.length} bijlage${files.length !== 1 ? "s" : ""}` : ""} is ontvangen. We nemen binnen 24 uur contact met u op via ${email} of bel ons direct op +31 (0)6 45087592 voor directe hulp.`,
    }
  } catch (error) {
    console.error("❌ Failed to send email:", error)

    // Provide specific error messages based on the error type
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return {
          success: false,
          error: "Email service configuratie probleem. Bel ons direct op +31 (0)6 45087592.",
        }
      }
      if (error.message.includes("rate limit")) {
        return {
          success: false,
          error: "Te veel berichten verzonden. Probeer het over een paar minuten opnieuw of bel +31 (0)6 45087592.",
        }
      }
    }

    return {
      success: false,
      error:
        "Er is een probleem opgetreden bij het verzenden van uw bericht. Bel ons direct op +31 (0)6 45087592 of stuur een email naar info@mastercleanservice.nl.",
    }
  } finally {
    console.log("=== CONTACT FORM SUBMISSION END ===")
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

  if (!smtpConfigured) {
    console.error("SMTP niet geconfigureerd", {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      userSet: !!process.env.EMAIL_USER,
      passSet: !!process.env.EMAIL_PASS,
    })
    return {
      success: false,
      error: "SMTP niet geconfigureerd. Stel EMAIL_HOST, EMAIL_PORT, EMAIL_USER en EMAIL_PASS in en probeer opnieuw.",
    }
  }

  // 1) Try SMTP first
  try {
    if (smtpConfigured) {
const transporter = createSMTPTransporter()
      const from = process.env.EMAIL_FROM || process.env.EMAIL_USER || "info@mastercleanservice.nl"

      const formattedDate = new Date(preferredDate).toLocaleDateString("nl-NL", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      const formattedTime = preferredTime

      const html = `
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
          ${message ? `<div style=\"background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;\"><h3 style=\"color: #374151; margin-top: 0;\">💬 Aanvullende Informatie:</h3><p style=\"white-space: pre-wrap;\">${message}</p></div>` : ""}
        </div>`

      await transporter.verify()

      await transporter.sendMail({
        from,
        to: "info@mastercleanservice.nl",
        subject: `🗓️ Nieuwe Afspraakverzoek van ${name} - ${formattedDate}`,
        html,
      })

      // Confirmation to customer
      await transporter.sendMail({
        from,
        to: email,
        subject: "Afspraakverzoek ontvangen - MasterClean",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7c3aed;">Bedankt voor uw afspraakverzoek, ${name}!</h2>
            <p>Wij nemen binnen 24 uur contact met u op om de afspraak te bevestigen.</p>
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;">
                <strong>⏰ Wat gebeurt er nu?</strong><br>
                Wij nemen binnen 24 uur contact met u op om de afspraak te bevestigen en eventuele details door te spreken.
              </p>
            </div>
            <div style="background-color: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #166534;">
                <strong>🚀 Spoed of vragen?</strong><br>
                Bel ons direct: <a href="tel:+31645087592" style="color: #ea580c;">+31 (0)6 45087592</a><br>
                WhatsApp: <a href="https://wa.me/31657211993" style="color: #16a34a;">+31 6 57211993</a>
              </p>
            </div>
          </div>`
      })

      console.log("✅ Appointment email sent via SMTP")
      return {
        success: true,
        message: `Bedankt ${name}! Uw afspraakverzoek voor ${formattedDate} om ${formattedTime} is ontvangen. Wij nemen binnen 24 uur contact met u op om de afspraak te bevestigen.`,
      }
    }
  } catch (e) {
    console.error("SMTP appointment send failed:", e)
    return {
      success: false,
      error: "E-mail kon niet worden verzonden via SMTP (afspraak). Controleer uw SMTP-instellingen en probeer opnieuw.",
    }
  }

  // SMTP only: no other fallbacks
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY not found in environment variables")
    return {
      success: false,
      error: "Email service niet geconfigureerd. Bel ons direct op +31 (0)6 45087592.",
    }
  }

  try {
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
                Bel ons direct: <a href="tel:+31645087592" style="color: #ea580c;">+31 (0)6 45087592</a><br>
                WhatsApp: <a href="https://wa.me/31657211993" style="color: #16a34a;">+31 6 57211993</a>
              </p>
            </div>
            
            <p>Met vriendelijke groet,<br>
            Het MasterClean Team</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <div style="color: #6b7280; font-size: 14px;">
              <p><strong>MasterClean</strong><br>
              Telefoon: +31 (0)85 0805636<br>
              WhatsApp: +31 6 57211993<br>
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
          error: "Te veel berichten verzonden. Probeer het over een paar minuten opnieuw of bel +31 (0)6 45087592.",
        }
      }
    }

    return {
      success: false,
      error:
        "Er is een probleem opgetreden bij het verzenden van uw afspraakverzoek. Bel ons direct op +31 (0)6 45087592 of stuur een WhatsApp naar +31 6 57211993.",
    }
  } finally {
    console.log("=== APPOINTMENT FORM SUBMISSION END ===")
  }
}

// Direct email solution using mailto or webhook
async function sendEmailDirectly({ name, email, phone, message, files }: {
  name: string;
  email: string;
  phone: string;
  message: string;
  files: any[];
}) {
  try {
    console.log("📧 Attempting direct email solution...")
    
    // Use Web3Forms as a reliable service
    const web3formsUrl = 'https://api.web3forms.com/submit'
    
    const formData = new FormData()
formData.append('access_key', 'your_correct_access_key')
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone || 'Niet opgegeven')
    formData.append('message', message)
    formData.append('from_name', 'MasterClean Website')
    formData.append('subject', `🔵 Nieuwe contactaanvraag van ${name} - MasterClean`)
    formData.append('to', 'info@mastercleanservice.nl')
    formData.append('replyto', email)
    
    const fullMessage = `
Nieuwe contactaanvraag via MasterClean website:

==== CONTACTGEGEVENS ====
Naam: ${name}
Email: ${email}
Telefoon: ${phone || 'Niet opgegeven'}

==== BERICHT ====
${message}

==== DETAILS ====
Verzonden op: ${new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' })}
Bijlagen: ${files.length > 0 ? `${files.length} bestand(en)` : 'Geen bijlagen'}

⚡ ACTIE VEREIST: Neem binnen 24 uur contact op met deze klant!

📞 Direct contact:
- Bel: ${phone || 'Niet opgegeven'}
- Email: ${email}
- Website: https://mastercleanservice.nl
`
    
    formData.append('message', fullMessage)
    
    const response = await fetch(web3formsUrl, {
      method: 'POST',
      body: formData
    })
    
    const result = await response.json()
    
    if (response.ok && result.success) {
      console.log("✅ Direct email sent successfully via Web3Forms")
      return {
        success: true,
        message: `Bedankt ${name}! Uw bericht is ontvangen. We nemen binnen 24 uur contact met u op via ${email} of bel ons direct op +31 (0)6 45087592 voor directe hulp.`
      }
    } else {
      console.error("Web3Forms error:", result)
      throw new Error(`Web3Forms failed: ${result.message || 'Unknown error'}`)
    }
  } catch (error) {
    console.error("❌ Direct email failed:", error)
    // Try alternative method
    return await sendEmailViaAlternative({ name, email, phone, message, files })
  }
}

// Alternative email solution using webhook
async function sendEmailViaAlternative({ name, email, phone, message, files }: {
  name: string;
  email: string;
  phone: string;
  message: string;
  files: any[];
}) {
  try {
    console.log("Attempting alternative email solution...")
    
    // Use Formspree as backup (free service)
    const formspreeUrl = 'https://formspree.io/f/xvgorqbv' // You'll need to set this up
    
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone || 'Niet opgegeven')
    formData.append('message', message)
    formData.append('_replyto', email)
    formData.append('_subject', `Nieuwe contactaanvraag van ${name} - MasterClean`)
    formData.append('_redirect', 'https://mastercleanservice.nl/bedankt')
    
    const emailBody = `
Nieuwe contactaanvraag via MasterClean website:

Naam: ${name}
Email: ${email}
Telefoon: ${phone || 'Niet opgegeven'}

Bericht:
${message}

Verzonden op: ${new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' })}

${files.length > 0 ? `Bijlagen: ${files.length} bestand(en)` : 'Geen bijlagen'}
`
    
    formData.append('message_full', emailBody)
    
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    
    if (response.ok) {
      console.log("✅ Alternative email sent successfully")
      return {
        success: true,
        message: `Bedankt ${name}! Uw bericht is ontvangen via ons backup systeem. We nemen binnen 24 uur contact met u op via ${email} of bel ons direct op +31 (0)6 45087592.`
      }
    } else {
      throw new Error(`HTTP ${response.status}`)
    }
  } catch (error) {
    console.error("❌ Alternative email also failed:", error)
    return {
      success: false,
      error: "Email service tijdelijk niet beschikbaar. Bel ons direct op +31 (0)6 45087592 of stuur een email naar info@mastercleanservice.nl"
    }
  }
}

// Debug function to check environment setup
export async function debugEnvironmentSetup() {
  try {
    console.log("=== ENVIRONMENT DEBUG START ===")
    console.log("NODE_ENV:", process.env.NODE_ENV)

    const smtpInfo = {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      userSet: !!process.env.EMAIL_USER,
      passSet: !!process.env.EMAIL_PASS,
    }
    console.log("SMTP:", smtpInfo)

    console.log("=== ENVIRONMENT DEBUG END ===")

    return {
      nodeEnv: process.env.NODE_ENV || "unknown",
      smtp: smtpInfo,
      isConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
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
