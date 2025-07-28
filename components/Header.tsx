"use client"
import React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSelector from "./LanguageSelector"
import SocialMediaIcons from "./SocialMediaIcons"
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
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href={`/?lang=${lang}`} className="flex items-center flex-shrink-0">
            <Image
              src="/mastercerclean-logo.png"
              alt="MasterCerClean"
              width={280}
              height={70}
              className="h-10 sm:h-14 w-auto object-contain"
              priority
              quality={90}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href={`/?lang=${lang}`}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                isActive("/") 
                  ? "bg-blue-50 text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              {translations.nav.home}
            </Link>
            <Link
              href={`/services?lang=${lang}`}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                isActive("/services")
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              {translations.nav.services}
            </Link>
            <Link
              href={`/about?lang=${lang}`}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                isActive("/about")
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              {translations.nav.about}
            </Link>
            <Link
              href={`/contact?lang=${lang}`}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                isActive("/contact")
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              {translations.nav.contact}
            </Link>
          </nav>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:block">
              <LanguageSelector currentLang={lang} />
            </div>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-3 sm:px-6 py-2 sm:py-2.5 text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
              asChild
            >
              <a href="tel:+31850805636" className="flex items-center">
                <Phone className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{translations.nav.callNow}</span>
                <span className="sm:hidden text-xs">Bel</span>
              </a>
            </Button>
            
            {/* Social Icons - Right Corner */}
            <div className="hidden lg:flex items-center">
              <SocialMediaIcons variant="header" />
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md shadow-lg">
            <nav className="py-4 space-y-2 px-4">
              <Link
                href={`/?lang=${lang}`}
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive("/") ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.nav.home}
              </Link>
              <Link
                href={`/services?lang=${lang}`}
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive("/services") ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.nav.services}
              </Link>
              <Link
                href={`/about?lang=${lang}`}
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive("/about") ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.nav.about}
              </Link>
              <Link
                href={`/contact?lang=${lang}`}
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive("/contact") ? "bg-blue-50 text-blue-600 shadow-sm" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.nav.contact}
              </Link>
              
              {/* Mobile Language Selector */}
              <div className="pt-2 border-t border-gray-200">
                <LanguageSelector currentLang={lang} />
              </div>
              
              <div className="pt-2 border-t border-gray-200 flex justify-end">
                <SocialMediaIcons variant="header" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
