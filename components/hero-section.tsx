import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - exact positioning */}
          <div className="space-y-8">
            {/* Title - exact same styling */}
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Waarom Kiezen
              <br />
              Voor MasterClean?
            </h1>

            {/* Description text - exact same */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Met meer dan 10 jaar ervaring in de schoonmaakbranche, staat MasterClean bekend om betrouwbaarheid,
              kwaliteit en klanttevredenheid. Ons ervaren team gebruikt professionele apparatuur en milieuvriendelijke
              producten.
            </p>

            {/* Stats - exact positioning side by side */}
            <div className="flex space-x-12">
              <div>
                <div className="text-4xl font-bold text-blue-500">10+</div>
                <div className="text-gray-600 font-medium">Jaar Ervaring</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-500">500+</div>
                <div className="text-gray-600 font-medium">Tevreden Klanten</div>
              </div>
            </div>

            {/* CTA Button - exact styling */}
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-medium">
              <Phone className="w-4 h-4 mr-2" />
              BEL NU VOOR INFO
            </Button>
          </div>

          {/* Right Image - Team photo exactly like original */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
                alt="MasterClean schoonmaakteam - 5 professionals in zwarte schorten met professionele schoonmaakapparatuur"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
