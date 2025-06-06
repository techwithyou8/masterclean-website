import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export default function CtaSection() {
  return (
    <section className="bg-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Klaar Om Met Ons Te Werken?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Ervaar zelf waarom meer dan 500 klanten vertrouwen op MasterClean voor hun schoonmaakbehoeften
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded font-medium">
            NEEM CONTACT OP
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded font-medium">
            <Phone className="w-4 h-4 mr-2" />
            BEL NU: +31 (0)85 0805636
          </Button>
        </div>
      </div>
    </section>
  )
}
