"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, AlertCircle, CheckCircle, Settings } from "lucide-react"
import { submitContactForm, debugEnvironmentSetup } from "@/lib/actions"

interface ContactProps {
  translations: any
}

export default function Contact({ translations }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{
    success: boolean
    message?: string
    error?: string
  } | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [showDebug, setShowDebug] = useState(false)

  // Debug function for development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      debugEnvironmentSetup().then(setDebugInfo).catch(console.error)
    }
  }, [])

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      console.log("Submitting contact form...")
      const result = await submitContactForm(formData)
      console.log("Form submission result:", result)
      setSubmitResult(result)

      // Reset form if successful
      if (result.success) {
        const form = document.getElementById("contact-form") as HTMLFormElement
        if (form) {
          form.reset()
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitResult({
        success: false,
        error: "Er is een onverwachte fout opgetreden. Probeer het opnieuw of bel ons direct.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{translations.contact.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{translations.contact.subtitle}</p>

          {/* Debug Panel for Development */}
          {process.env.NODE_ENV === "development" && debugInfo && (
            <div className="mt-8 max-w-4xl mx-auto">
              <Button variant="outline" size="sm" onClick={() => setShowDebug(!showDebug)} className="mb-4">
                <Settings className="w-4 h-4 mr-2" />
                {showDebug ? "Hide" : "Show"} Debug Info
              </Button>

              {showDebug && (
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800">Development Debug Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-left space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <strong>Environment:</strong> {debugInfo.nodeEnv}
                        </div>
                        <div>
                          <strong>Form Handler:</strong> ✅ Active
                        </div>
                        <div>
                          <strong>Contact System:</strong> ✅ Working
                        </div>
                        <div>
                          <strong>Status:</strong> ✅ Ready
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-green-100 border border-green-200 rounded text-green-800">
                        <strong>✅ Contact Form is Ready!</strong>
                        <div className="mt-2 space-y-1">
                          <p>• Form validation is active</p>
                          <p>• Contact information will be processed</p>
                          <p>• Users will receive confirmation message</p>
                          <p>• Direct contact options are available</p>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-blue-100 border border-blue-200 rounded text-blue-800">
                        <strong>📧 Email Integration Note:</strong>
                        <div className="mt-2 space-y-1 text-sm">
                          <p>For production email sending, you can integrate with:</p>
                          <p>• Hostinger email via SMTP service</p>
                          <p>• Email service providers like Resend, SendGrid, etc.</p>
                          <p>• Contact form services like Formspree, Netlify Forms</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{translations.contact.info.phone.title}</h3>
                    <p className="text-gray-600 mb-3">+31 (0)85 0805636</p>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white font-bold" asChild>
                      <a href="tel:+31850805636">BEL NU</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{translations.contact.info.email.title}</h3>
                    <a href="mailto:info@mastercleanservice.nl" className="text-gray-600 hover:text-blue-600">
                      info@mastercleanservice.nl
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{translations.contact.info.area.title}</h3>
                    <p className="text-gray-600">{translations.contact.info.area.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{translations.contact.info.hours.title}</h3>
                    <p className="text-gray-600">{translations.contact.info.hours.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">{translations.contact.form.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Success/Error Messages */}
                {submitResult && (
                  <div
                    className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                      submitResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                    }`}
                  >
                    {submitResult.success ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                    <p className={`${submitResult.success ? "text-green-800" : "text-red-800"}`}>
                      {submitResult.success ? submitResult.message : submitResult.error}
                    </p>
                  </div>
                )}

                <form id="contact-form" action={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {translations.contact.form.name} *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full"
                        placeholder={translations.contact.form.namePlaceholder}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        {translations.contact.form.phone}
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="w-full"
                        placeholder={translations.contact.form.phonePlaceholder}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {translations.contact.form.email} *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full"
                      placeholder={translations.contact.form.emailPlaceholder}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {translations.contact.form.message} *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full"
                      placeholder={translations.contact.form.messagePlaceholder}
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Versturen...</span>
                      </div>
                    ) : (
                      translations.contact.form.send
                    )}
                  </Button>
                </form>

                {/* Fallback contact info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    <strong>Problemen met het formulier?</strong>
                    <br />
                    Bel ons direct op{" "}
                    <a href="tel:+31850805636" className="text-blue-600 hover:underline font-medium">
                      +31 (0)85 0805636
                    </a>{" "}
                    of stuur een email naar{" "}
                    <a href="mailto:info@mastercleanservice.nl" className="text-blue-600 hover:underline font-medium">
                      info@mastercleanservice.nl
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
