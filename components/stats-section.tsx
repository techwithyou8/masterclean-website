export default function StatsSection() {
  const stats = [
    {
      number: "500+",
      label: "Tevreden Klanten",
      color: "text-blue-500",
    },
    {
      number: "10+",
      label: "Jaar Ervaring",
      color: "text-blue-500",
    },
    {
      number: "24/7",
      label: "Service Beschikbaar",
      color: "text-blue-500",
    },
    {
      number: "100%",
      label: "Tevredenheidsgarantie",
      color: "text-blue-500",
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-3">
              <div className={`text-5xl lg:text-6xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
              <div className="text-gray-600 font-medium text-base lg:text-lg leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
