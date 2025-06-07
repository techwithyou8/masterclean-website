"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSelector from "./LanguageSelector"
import Image from "next/image"

interface HeaderProps {
  translations: any
  lang: string
}

export default function Header({ translations, lang }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/?lang=${lang}`} className="flex items-center space-x-2">
            <Image
              src="/masterclean-logo-final.png"
              alt="MasterClean"
              width={200}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={`/?lang=${lang}`}
              className={`font-medium transition-colors ${
                isActive("/") ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {translations.nav.home}
            </Link>
            <Link
              href={`/services?lang=${lang}`}
              className={`font-medium transition-colors ${
                isActive("/services")
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {translations.nav.services}
            </Link>
            <Link
              href={`/about?lang=${lang}`}
              className={`font-medium transition-colors ${
                isActive("/about")
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {translations.nav.about}
            </Link>
            <Link
              href={`/contact?lang=${lang}`}
              className={`font-medium transition-colors ${
                isActive("/contact")
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {translations.nav.contact}
            </Link>
            <LanguageSelector currentLang={lang} />
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 animate-pulse" asChild>
              <a href="tel:+31850805636">
                <Phone className="w-4 h-4 mr-2" />
<<<<<<< HEAD
                BEL NU
=======
                {translations.nav.callNow}
>>>>>>> b1ce85d (Initial commit)
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSelector currentLang={lang} />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href={`/?lang=${lang}`}
                className={`font-medium ${isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.nav.home}
              </Link>
              <Link
                href={`/services?lang=${lang}`}
                className={`font-medium ${
                  isActive("/services") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.nav.services}
              </Link>
              <Link
                href={`/about?lang=${lang}`}
                className={`font-medium ${isActive("/about") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.nav.about}
              </Link>
              <Link
                href={`/contact?lang=${lang}`}
                className={`font-medium ${
                  isActive("/contact") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.nav.contact}
              </Link>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-fit animate-pulse" asChild>
                <a href="tel:+31850805636">
                  <Phone className="w-4 h-4 mr-2" />
<<<<<<< HEAD
                  BEL NU
=======
                  {translations.nav.callNow}
>>>>>>> b1ce85d (Initial commit)
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
