import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Phone } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-bold text-blue-500 tracking-wide">
              MASTERCLEAN
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-12">
            <Link href="/" className="text-gray-700 hover:text-blue-500 text-base font-medium transition-colors">
              Home
            </Link>
            <Link
              href="/diensten"
              className="text-gray-700 hover:text-blue-500 text-base font-medium transition-colors"
            >
              Diensten
            </Link>
            <Link href="/about" className="text-blue-500 text-base font-semibold border-b-2 border-blue-500 pb-1">
              Over Ons
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-500 text-base font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Language & CTA */}
          <div className="flex items-center space-x-6">
            {/* Dutch Flag */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="flex">
                <div className="w-1 h-4 bg-red-600"></div>
                <div className="w-1 h-4 bg-white border-t border-b border-gray-300"></div>
                <div className="w-1 h-4 bg-blue-600"></div>
              </div>
              <span className="text-gray-800 font-medium text-sm">NL</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-sm tracking-wide shadow-lg">
              <Phone className="w-4 h-4 mr-2" />
              BEL NU
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
