import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">MASTERCLEAN</h3>
            <p className="text-gray-300 mb-4">Professionele schoonmaakdiensten in Zeeland en Noord-Holland</p>
            <p className="text-gray-400 text-sm mb-2">K.V.K 96538414</p>
            <p className="text-gray-400 text-sm mb-6">BTW NL005215222B17</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm">BEL NU</Button>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Diensten</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/vakantiehuizen" className="text-gray-300 hover:text-white">
                  Vakantiehuizen
                </Link>
              </li>
              <li>
                <Link href="/kantoorschoonmaak" className="text-gray-300 hover:text-white">
                  Kantoorschoonmaak
                </Link>
              </li>
              <li>
                <Link href="/algemene-schoonmaak" className="text-gray-300 hover:text-white">
                  Algemene Schoonmaak
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="text-gray-300">+31 (0)85 0805636</li>
              <li className="text-gray-300">info@mastercleanservice.nl</li>
              <li className="text-gray-300">Zeeland & Noord-Holland</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Snelle Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/diensten" className="text-gray-300 hover:text-white">
                  Diensten
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  Over Ons
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">© 2024 MasterClean. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}
