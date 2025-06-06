export default function StatsSection() {
  const stats = [
    {
      number: "500+",
      label: "Tevreden Klanten",
      color: "text-blue-600",
    },
    {
      number: "10+",
      label: "Jaar Ervaring",
      color: "text-blue-600",
    },
    {
      number: "24/7",
      label: "Service Beschikbaar",
      color: "text-blue-600",
    },
    {
      number: "100%",
      label: "Tevredenheidsgarantie",
      color: "text-blue-600",
    },
  ]

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className={`text-4xl lg:text-5xl font-bold ${stat.color}`}>{stat.number}</div>
              <div className="text-gray-600 font-medium text-sm lg:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
