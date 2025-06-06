import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Phone } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              MASTERCLEAN
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/diensten" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Diensten
            </Link>
            <Link href="/about" className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium">
              Over Ons
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Contact
            </Link>
          </nav>

          {/* Language & CTA */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm">
              <span className="w-5 h-4 bg-orange-500 rounded-sm"></span>
              <span className="w-5 h-4 bg-white border rounded-sm"></span>
              <span className="w-5 h-4 bg-blue-500 rounded-sm"></span>
              <span className="text-gray-700 font-medium">NL</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium">
              <Phone className="w-4 h-4 mr-2" />
              BEL NU
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
