"use client"
import Contact from "@/components/Contact"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, MessageCircle, Calendar } from "lucide-react"
import { getTranslations } from "@/lib/translations"

interface ContactPageProps {
  searchParams: { lang?: string }
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  const lang = searchParams.lang || "nl"
  const t = getTranslations(lang)

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
      link: "https://wa.me/31850805636",
      color: "green",
    },
    {
      icon: Calendar,
      title: "Plan Een Afspraak",
      description: "Voor een persoonlijk gesprek",
      action: "PLAN AFSPRAAK",
      link: "tel:+31850805636",
      color: "purple",
    },
  ]

  const serviceAreas = [
    "Middelburg",
    "Vlissingen",
    "Goes",
    "Terneuzen",
    "Hulst",
    "Amsterdam",
    "Haarlem",
    "Alkmaar",
    "Hoorn",
    "Enkhuizen",
    "Den Helder",
    "Purmerend",
    "Zaandam",
    "Beverwijk",
    "Hilversum",
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
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white"
              asChild
            >
              <a href="mailto:info@mastercleanservice.nl">
                <Mail className="w-5 h-5 mr-2" />
                STUUR EMAIL
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
                  <Button
                    className={`bg-${method.color}-600 hover:bg-${method.color}-700 text-white w-full font-bold`}
                    asChild
                  >
                    <a href={method.link}>{method.action}</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
              <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold" asChild>
                <a href="tel:+31850805636">
                  <Phone className="w-4 h-4 mr-2" />
                  BEL NU VOOR INFO
                </a>
              </Button>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8 text-center">
              <Clock className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Openingstijden</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Maandag - Vrijdag:</span>
                  <span>07:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Zaterdag:</span>
                  <span>08:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Zondag:</span>
                  <span>09:00 - 18:00</span>
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
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold" asChild>
              <a href="tel:+31850805636">
                <Phone className="w-5 h-5 mr-2" />
                BEL NU VOOR ANTWOORDEN
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
