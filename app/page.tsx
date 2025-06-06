import TeamSection from "../team-section"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-blue-600">MasterClean</h1>
        </div>
      </header>

      {/* Hero sectie */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Over Ons</h1>
          <p className="text-xl">Professionele schoonmaakdiensten sinds 2010</p>
        </div>
      </section>

      {/* Team sectie */}
      <TeamSection />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 MasterClean. Alle rechten voorbehouden.</p>
        </div>
      </footer>
    </main>
  )
}
