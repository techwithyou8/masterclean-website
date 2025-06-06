import { CheckCircle, Star, Heart, Target } from "lucide-react"

export default function ValuesSection() {
  const values = [
    {
      icon: CheckCircle,
      title: "Betrouwbaarheid",
      description:
        "Wij staan voor onze afspraken en leveren altijd wat we beloven. Kwaliteit en consistentie zijn onze kernwaarden.",
    },
    {
      icon: Star,
      title: "Kwaliteit",
      description:
        "Alleen het beste is goed genoeg. Wij gebruiken professionele apparatuur en hoogwaardige, milieuvriendelijke producten.",
    },
    {
      icon: Heart,
      title: "Klanttevredenheid",
      description: "Uw tevredenheid is ons doel. Wij gaan altijd de extra mijl om uw verwachtingen te overtreffen.",
    },
    {
      icon: Target,
      title: "Precisie",
      description:
        "Elk detail telt. Ons team is getraind om ook de kleinste hoekjes en gaatjes grondig schoon te maken.",
    },
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Onze Waarden</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Deze kernwaarden vormen de basis van alles wat wij doen en bepalen hoe wij onze klanten bedienen
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
