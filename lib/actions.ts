"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(formData: FormData) {
  console.log("=== CONTACT FORM SUBMISSION START ===")

  // Get form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const message = formData.get("message") as string

  console.log("Form data received:", { name, email, phone: !!phone, message: !!message })

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

  // Check if API key is available
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY not found in environment variables")
    return {
      success: false,
      error: "Email service niet geconfigureerd. Bel ons direct op +31 (0)85 0805636.",
    }
  }

  console.log("✅ RESEND_API_KEY found, length:", process.env.RESEND_API_KEY?.length)
  console.log("✅ API key prefix:", process.env.RESEND_API_KEY?.substring(0, 8))

  try {
    console.log("Attempting to send email via Resend...")

    // Send email to MasterClean
    const emailResult = await resend.emails.send({
      from: "MasterClean <onboarding@resend.dev>", // Using Resend's default domain for now
      to: ["info@mastercleanservice.nl"],
      subject: `Nieuwe contactaanvraag van ${name}`,
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
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;">
                <strong>🚀 Spoed?</strong> Bel ons direct op <a href="tel:+31850805636" style="color: #ea580c;">+31 (0)85 0805636</a>
              </p>
            </div>
            
            <p>Met vriendelijke groet,<br>
            Het MasterClean Team</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <div style="color: #6b7280; font-size: 14px;">
              <p><strong>MasterClean</strong><br>
              Telefoon: +31 (0)85 0805636<br>
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
      message: `Bedankt ${name}! Uw bericht is ontvangen. We nemen binnen 24 uur contact met u op via ${email} of bel ons direct op +31 (0)85 0805636 voor directe hulp.`,
    }
  } catch (error) {
    console.error("❌ Failed to send email:", error)

    // Provide specific error messages based on the error type
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
        "Er is een probleem opgetreden bij het verzenden van uw bericht. Bel ons direct op +31 (0)85 0805636 of stuur een email naar info@mastercleanservice.nl.",
    }
  } finally {
    console.log("=== CONTACT FORM SUBMISSION END ===")
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
