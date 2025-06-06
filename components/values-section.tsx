export default function ValuesSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Onze Waarden</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bij MasterClean staan kwaliteit, betrouwbaarheid en klanttevredenheid centraal in alles wat we doen.
          </p>
        </div>

        {/* Values content would continue here */}
        <div className="grid md:grid-cols-3 gap-8">
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
