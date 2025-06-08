"use client"
import { useState, memo } from "react"
import Contact from "@/components/Contact"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, MessageCircle, Calendar, X, CheckCircle, AlertCircle } from "lucide-react"
import { getTranslations } from "@/lib/translations"
import { submitAppointmentForm } from "@/lib/actions"

interface ContactPageProps {
  searchParams: { lang?: string }
}

interface FAQItem {
  question: string;
  answer: string;
}

// Memoized CardList for FAQ
const FAQCardList = memo(function FAQCardList({ items }: { items: FAQItem[] }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {items.map((item, index) => (
        <Card key={index} className="border-0 shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.question}</h3>
            <p className="text-gray-600 leading-relaxed">{item.answer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
})

export default function ContactPage({ searchParams }: ContactPageProps) {
  const lang = searchParams.lang || "nl"
  const t = getTranslations(lang)
  
  // Get service areas from translations
  const serviceAreas = t.contact.serviceAreas || []
  
  // Get FAQ items from translations
  const faqItems = t.contact.faq || []

  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [isSubmittingAppointment, setIsSubmittingAppointment] = useState(false)
  const [appointmentResult, setAppointmentResult] = useState<{
    success: boolean
    message?: string
    error?: string
  } | null>(null)

  // Remove unused variables

  const contactMethods = [
    {
      icon: Phone,
      title: t.nav.callNow,
      description: t.contact.info.phone.title,
      action: t.nav.callNow,
      link: "tel:+31850805636",
      color: "orange",
    },
    {
      icon: Mail,
      title: t.contact.info.email.title,
      description: t.contact.info.email.title,
      action: t.contact.info.email.title,
      link: "mailto:info@mastercleanservice.nl",
      color: "blue",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "WhatsApp",
      action: "WhatsApp",
      link: "https://wa.me/31657211993?text=Hallo%20MasterClean%2C%20ik%20heb%20interesse%20in%20jullie%20schoonmaakdiensten.",
      color: "green",
    },
    {
      icon: Calendar,
      title: t.contact.team.appointment.title,
      description: t.contact.team.appointment.subtitle,
      action: t.contact.team.appointment.action,
      link: "#",
      color: "purple",
      onClick: () => setShowAppointmentModal(true),
    },
  ]

  async function handleAppointmentSubmit(formData: FormData) {
    setIsSubmittingAppointment(true)
    setAppointmentResult(null)

    try {
      const result = await submitAppointmentForm(formData)
      setAppointmentResult(result)

      if (result.success) {
        // Reset form and close modal after 3 seconds
        setTimeout(() => {
          setShowAppointmentModal(false)
          setAppointmentResult(null)
        }, 3000)
      }
    } catch (error) {
      console.error("Error submitting appointment:", error)
      setAppointmentResult({
        success: false,
        error: "Er is een onverwachte fout opgetreden. Probeer het opnieuw of bel ons direct.",
      })
    } finally {
      setIsSubmittingAppointment(false)
    }
  }

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-orange-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">{t.contact.title}</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">{t.contact.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold animate-pulse" asChild>
              <a href="tel:+31850805636">
                <Phone className="w-5 h-5 mr-2" />
                {t.nav.callNow}: {t.hero.phone}
              </a>
            </Button>
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold" asChild>
              <a
                href="https://wa.me/31657211993?text=Hallo%20MasterClean%2C%20ik%20heb%20interesse%20in%20jullie%20schoonmaakdiensten."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WHATSAPP NU
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.contact.contactMethods.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.contact.contactMethods.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${method.color === 'green' ? 'bg-green-100' : method.color === 'orange' ? 'bg-orange-100' : method.color === 'blue' ? 'bg-blue-100' : method.color === 'purple' ? 'bg-purple-100' : ''}`}
                  >
                    <method.icon className={`w-8 h-8 ${method.color === 'green' ? 'text-green-600' : method.color === 'orange' ? 'text-orange-600' : method.color === 'blue' ? 'text-blue-600' : method.color === 'purple' ? 'text-purple-600' : ''}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{method.title}</h3>
                  <p className="text-gray-600 mb-6">{method.description}</p>
                  {method.onClick ? (
                    <Button
                      onClick={method.onClick}
                      className={`w-full font-bold ${method.color === 'green' ? 'bg-green-600 hover:bg-green-700' : method.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' : method.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : method.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' : ''} text-white`}
                    >
                      {method.action}
                    </Button>
                  ) : (
                    <Button
                      className={`w-full font-bold ${method.color === 'green' ? 'bg-green-600 hover:bg-green-700' : method.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' : method.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : method.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' : ''} text-white`}
                      asChild
                    >
                      <a
                        href={method.link}
                        target={method.link.startsWith("http") ? "_blank" : undefined}
                        rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {method.action}
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">{t.contact.appointmentForm.title}</h2>
              <button onClick={() => setShowAppointmentModal(false)} className="text-gray-400 hover:text-gray-600" title="Sluiten">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {appointmentResult && (
                <div
                  className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                    appointmentResult.success
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  {appointmentResult.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                  <p className={`${appointmentResult.success ? "text-green-800" : "text-red-800"}`}>
                    {appointmentResult.success ? appointmentResult.message : appointmentResult.error}
                  </p>
                </div>
              )}

              <form action={handleAppointmentSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="appointment-name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.contact.appointmentForm.name} *
                    </label>
                    <Input
                      id="appointment-name"
                      name="name"
                      type="text"
                      required
                      placeholder={t.contact.appointmentForm.namePlaceholder}
                      disabled={isSubmittingAppointment}
                    />
                  </div>
                  <div>
                    <label htmlFor="appointment-phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.contact.appointmentForm.phone} *
                    </label>
                    <Input
                      id="appointment-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder={t.contact.appointmentForm.phonePlaceholder}
                      disabled={isSubmittingAppointment}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="appointment-email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.appointmentForm.email} *
                  </label>
                  <Input
                    id="appointment-email"
                    name="email"
                    type="email"
                    required
                    placeholder={t.contact.appointmentForm.emailPlaceholder}
                    disabled={isSubmittingAppointment}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="appointment-date" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.contact.appointmentForm.preferredDate} *
                    </label>
                    <Input
                      id="appointment-date"
                      name="preferredDate"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      disabled={isSubmittingAppointment}
                    />
                  </div>
                  <div>
                    <label htmlFor="appointment-time" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.contact.appointmentForm.preferredTime} *
                    </label>
                    <Input
                      id="appointment-time"
                      name="preferredTime"
                      type="time"
                      required
                      disabled={isSubmittingAppointment}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="appointment-service" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.appointmentForm.serviceType} *
                  </label>
                  <select
                    id="appointment-service"
                    name="serviceType"
                    required
                    disabled={isSubmittingAppointment}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{t.contact.appointmentForm.serviceTypePlaceholder}</option>
                    <option value="vakantiehuizen">{t.contact.appointmentForm.services.vacation}</option>
                    <option value="kantoor">{t.contact.appointmentForm.services.office}</option>
                    <option value="woning">{t.contact.appointmentForm.services.residential}</option>
                    <option value="verhuizing">{t.contact.appointmentForm.services.moving}</option>
                    <option value="eenmalig">{t.contact.appointmentForm.services.oneTime}</option>
                    <option value="anders">{t.contact.appointmentForm.services.other}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="appointment-address" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.appointmentForm.address}
                  </label>
                  <Input
                    id="appointment-address"
                    name="address"
                    type="text"
                    placeholder={t.contact.appointmentForm.addressPlaceholder}
                    disabled={isSubmittingAppointment}
                  />
                </div>

                <div>
                  <label htmlFor="appointment-message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.appointmentForm.additionalInfo}
                  </label>
                  <Textarea
                    id="appointment-message"
                    name="message"
                    rows={4}
                    placeholder={t.contact.appointmentForm.additionalInfoPlaceholder}
                    disabled={isSubmittingAppointment}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAppointmentModal(false)}
                    disabled={isSubmittingAppointment}
                    className="flex-1"
                  >
                    {t.contact.appointmentForm.cancel}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmittingAppointment}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isSubmittingAppointment ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t.contact.appointmentForm.submitting}</span>
                      </div>
                    ) : (
                      t.contact.appointmentForm.submit
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Section */}
      <Contact translations={t} />

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.contact.serviceArea.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.contact.serviceArea.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t.contact.serviceArea.citiesTitle}</h3>
              <div className="grid grid-cols-2 gap-4">
                {serviceAreas.map((city: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{city}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mt-6">
                Staat uw locatie er niet bij? Neem contact op, wij kijken graag naar de mogelijkheden!
              </p>
              <div className="flex gap-4 mt-4">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold" asChild>
                  <a href="tel:+31850805636">
                    <Phone className="w-4 h-4 mr-2" />
                    {t.nav.callNow}
                  </a>
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-white font-bold" asChild>
                  <a
                    href="https://wa.me/31657211993?text=Hallo%20MasterClean%2C%20ik%20wil%20graag%20weten%20of%20jullie%20in%20mijn%20gebied%20werken."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WHATSAPP
                  </a>
                </Button>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8 text-center">
              <Clock className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t.contact.businessHours.title}</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>{t.contact.businessHours.weekdays}</span>
                  <span>{t.contact.businessHours.weekdaysTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.contact.businessHours.sunday}</span>
                  <span>{t.contact.businessHours.sundayStatus}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">{t.contact.businessHours.emergency}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.contact.faqSection.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.contact.faqSection.subtitle}
            </p>
          </div>

          <FAQCardList items={faqItems} />
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">{t.contact.faqSection.moreQuestions}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold" asChild>
                <a href="tel:+31850805636">
                  <Phone className="w-5 h-5 mr-2" />
                  {t.contact.faqSection.callButton}
                </a>
              </Button>
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold" asChild>
                <a
                  href="https://wa.me/31657211993?text=Hallo%20MasterClean%2C%20ik%20heb%20een%20vraag%20over%20jullie%20diensten."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t.contact.faqSection.whatsappButton}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
