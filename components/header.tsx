import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-500">
              MASTERCLEAN
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-500 text-sm font-medium">
              Home
            </Link>
            <Link href="/diensten" className="text-gray-700 hover:text-blue-500 text-sm font-medium">
              Diensten
            </Link>
            <Link href="/about" className="text-blue-500 text-sm font-medium border-b-2 border-blue-500 pb-1">
              Over Ons
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-500 text-sm font-medium">
              Contact
            </Link>
          </nav>

          {/* Language & CTA */}
          <div className="flex items-center space-x-4">
            {/* Dutch Flag */}
            <div className="flex items-center space-x-2">
              <div className="flex border border-gray-300">
                <div className="w-2 h-3 bg-red-600"></div>
                <div className="w-2 h-3 bg-white"></div>
                <div className="w-2 h-3 bg-blue-600"></div>
              </div>
              <span className="text-gray-800 font-medium text-sm">NL</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium">
              BEL NU
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
