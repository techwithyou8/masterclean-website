import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Waarom Kiezen
                <br />
                <span className="text-gray-800">Voor MasterClean?</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Met meer dan 10 jaar ervaring in de schoonmaakbranche, staat MasterClean bekend om betrouwbaarheid,
                kwaliteit en klanttevredenheid. Ons ervaren team gebruikt professionele apparatuur en milieuvriendelijke
                producten.
              </p>
            </div>

            {/* Stats */}
            <div className="flex space-x-16">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-500 mb-2">10+</div>
                <div className="text-gray-700 font-medium text-lg">Jaar Ervaring</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-500 mb-2">500+</div>
                <div className="text-gray-700 font-medium text-lg">Tevreden Klanten</div>
              </div>
            </div>

            {/* CTA Button */}
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
              <Phone className="w-5 h-5 mr-3" />
              BEL NU VOOR INFO
            </Button>
          </div>

          {/* Right Image - Team Photo */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-white p-4">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600&q=80"
                alt="MasterClean professioneel schoonmaakteam met apparatuur"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-500 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
