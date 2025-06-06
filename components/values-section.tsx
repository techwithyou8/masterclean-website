export default function ValuesSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Just the title as shown in screenshot */}
        <div className="text-left">
          <h2 className="text-4xl font-bold text-gray-900">Onze Waarden</h2>
        </div>
        {/* Rest of content would continue below */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Kwaliteit</h3>
            <p className="text-gray-600">Hoogste standaarden in elke schoonmaakklus</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Betrouwbaarheid</h3>
            <p className="text-gray-600">Altijd op tijd en zoals afgesproken</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Duurzaamheid</h3>
            <p className="text-gray-600">Milieuvriendelijke producten en methoden</p>
          </div>
        </div>
      </div>
    </section>
  )
}
