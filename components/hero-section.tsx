import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Waarom Kiezen
                <br />
                Voor MasterClean?
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Met meer dan 10 jaar ervaring in de schoonmaakbranche, staat MasterClean bekend om betrouwbaarheid,
                kwaliteit en klanttevredenheid. Ons ervaren team gebruikt professionele apparatuur en milieuvriendelijke
                producten.
              </p>
            </div>

            {/* Stats */}
            <div className="flex space-x-12">
              <div>
                <div className="text-4xl font-bold text-blue-600">10+</div>
                <div className="text-gray-600 font-medium">Jaar Ervaring</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-500">500+</div>
                <div className="text-gray-600 font-medium">Tevreden Klanten</div>
              </div>
            </div>

            {/* CTA Button */}
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium text-lg">
              <Phone className="w-5 h-5 mr-2" />
              BEL NU VOOR INFO
            </Button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="MasterClean schoonmaakteam"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
