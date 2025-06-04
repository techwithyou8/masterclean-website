"use client"
import { useState } from "react"
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

export default function ContactPage({ searchParams }: ContactPageProps) {
  const lang = searchParams.lang || "nl"
  const t = getTranslations(lang)

  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [isSubmittingAppointment, setIsSubmittingAppointment] = useState(false)
  const [appointmentResult, setAppointmentResult] = useState<{
    success: boolean
    message?: string
    error?: string
  } | null>(null)

  const contactMethods = [
    {
      icon: Phone,
      title: "Bel Direct",
      description: "Voor directe vragen en spoedgevallen",
      action: "BEL NU",
      link: "tel:+31850805636",
      color: "orange",
    },
    {
      icon: Mail,
      title: "Stuur Een Email",
      description: "Voor uitgebreide vragen en offertes",
      action: "STUUR EMAIL",
      link: "mailto:info@mastercleanservice.nl",
      color: "blue",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Voor snelle communicatie",
      action: "WHATSAPP NU",
      link: "https://wa.me/31657211993?text=Hallo%20MasterClean%2C%20ik%20heb%20interesse%20in%20jullie%20schoonmaakdiensten.",
      color: "green",
    },
    {
      icon: Calendar,
      title: "Plan Een Afspraak",
      description: "Voor een persoonlijk gesprek",
      action: "PLAN AFSPRAAK",
      link: "#",
      color: "purple",
      onClick: () => setShowAppointmentModal(true),
    },
  ]

  const serviceAreas = [
    "Middelburg",
    "Vlissingen",
    "Goes",
    "Terneuzen",
    "Hulst",
    "Domburg",
    "Kamperland",
    "Renesse",
    "Breskens",
    "Scheveningen",
    "Katwijk",
    "Kijkduin",
    "Naaldwijk",
    "Wassenaar",
    "Den Haag",
  ]

  const faqItems = [
    {
      question: "Hoe snel kunnen jullie beginnen?",
      answer:
        "In de meeste gevallen kunnen wij binnen 24-48 uur starten, afhankelijk van de beschikbaarheid en het type dienst.",
    },
    {
      question: "Zijn jullie verzekerd?",
      answer: "Ja, wij hebben een volledige WA-verzekering en bedrijfsverzekering voor uw gemoedsrust.",
    },
    {
      question: "Welke schoonmaakmiddelen gebruiken jullie?",
      answer:
        "Wij gebruiken professionele, milieuvriendelijke schoonmaakmiddelen die veilig zijn voor mensen en huisdieren.",
    },
    {
      question: "Kunnen jullie ook in het weekend werken?",
      answer: "Ja, wij zijn 7 dagen per week beschikbaar, inclusief weekenden en feestdagen.",
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
                BEL NU: +31 (0)85 0805636
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Verschillende Manieren Om Contact Op Te Nemen</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kies de manier die het beste bij u past. Wij reageren altijd snel en professioneel
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
                    className={`w-16 h-16 bg-${method.color}-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <method.icon className={`w-8 h-8 text-${method.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{method.title}</h3>
                  <p className="text-gray-600 mb-6">{method.description}</p>
                  {method.onClick ? (
                    <Button
                      onClick={method.onClick}
                      className={`bg-${method.color}-600 hover:bg-${method.color}-700 text-white w-full font-bold`}
                    >
                      {method.action}
                    </Button>
                  ) : (
                    <Button
                      className={`bg-${method.color}-600 hover:bg-${method.color}-700 text-white w-full font-bold`}
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
              <h2 className="text-2xl font-bold text-gray-900">Plan Een Afspraak</h2>
              <button onClick={() => setShowAppointmentModal(false)} className="text-gray-400 hover:text-gray-600">
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
                      Naam *
                    </label>
                    <Input
                      id="appointment-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Uw volledige naam"
                      disabled={isSubmittingAppointment}
                    />
                  </div>
                  <div>
                    <label htmlFor="appointment-phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefoonnummer *
                    </label>
                    <Input
                      id="appointment-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+31 6 12345678"
                      disabled={isSubmittingAppointment}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="appointment-email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mailadres *
                  </label>
                  <Input
                    id="appointment-email"
                    name="email"
                    type="email"
                    required
                    placeholder="uw.email@voorbeeld.nl"
                    disabled={isSubmittingAppointment}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="appointment-date" className="block text-sm font-medium text-gray-700 mb-2">
                      Gewenste Datum *
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
                      Gewenste Tijd *
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
                    Type Dienst *
                  </label>
                  <select
                    id="appointment-service"
                    name="serviceType"
                    required
                    disabled={isSubmittingAppointment}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Selecteer een dienst</option>
                    <option value="vakantiehuizen">Vakantiehuizen Schoonmaken</option>
                    <option value="kantoor">Kantoorschoonmaak</option>
                    <option value="woning">Woningschoonmaak</option>
                    <option value="verhuizing">Verhuisschoonmaak</option>
                    <option value="eenmalig">Eenmalige Schoonmaak</option>
                    <option value="anders">Anders (specificeer in bericht)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="appointment-address" className="block text-sm font-medium text-gray-700 mb-2">
                    Adres
                  </label>
                  <Input
                    id="appointment-address"
                    name="address"
                    type="text"
                    placeholder="Straat, huisnummer, postcode, plaats"
                    disabled={isSubmittingAppointment}
                  />
                </div>

                <div>
                  <label htmlFor="appointment-message" className="block text-sm font-medium text-gray-700 mb-2">
                    Aanvullende Informatie
                  </label>
                  <Textarea
                    id="appointment-message"
                    name="message"
                    rows={4}
                    placeholder="Vertel ons meer over uw wensen, grootte van de ruimte, speciale eisen, etc."
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
                    Annuleren
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmittingAppointment}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isSubmittingAppointment ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Versturen...</span>
                      </div>
                    ) : (
                      "Plan Afspraak"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ons Werkgebied</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wij bedienen klanten in heel Zeeland en Noord-Holland
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Steden waar wij actief zijn:</h3>
              <div className="grid grid-cols-2 gap-4">
                {serviceAreas.map((city, index) => (
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
                    BEL NU
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
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Openingstijden</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Maandag - Zaterdag:</span>
                  <span>09:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Zondag:</span>
                  <span>Gesloten</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Voor spoedgevallen zijn wij 24/7 bereikbaar</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Veelgestelde Vragen</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hier vindt u antwoorden op de meest gestelde vragen over onze diensten
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqItems.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">Heeft u nog andere vragen?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold" asChild>
                <a href="tel:+31850805636">
                  <Phone className="w-5 h-5 mr-2" />
                  BEL NU
                </a>
              </Button>
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold" asChild>
                <a
                  href="https://wa.me/31657211993?text=Hallo%20MasterClean%2C%20ik%20heb%20een%20vraag%20over%20jullie%20diensten."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WHATSAPP VRAAG
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
