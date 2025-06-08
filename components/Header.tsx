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
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/?lang=${lang}`} className="flex items-center">
            <Image
              src="/mastercerclean-logo.png"
              alt="MasterCerClean"
              width={280}
              height={70}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href={`/?lang=${lang}`}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
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
          <div className="flex items-center space-x-3">
            <LanguageSelector currentLang={lang} />
            <div className="hidden md:flex items-center space-x-2">
              <SocialMediaIcons variant="header" />
            </div>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105" 
              asChild
            >
              <a href="tel:+31850805636" className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{translations.nav.callNow}</span>
                <span className="sm:hidden">Bel</span>
              </a>
            </Button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <nav className="py-4 space-y-1">
              <Link
                href={`/?lang=${lang}`}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive("/") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.nav.home}
              </Link>
              <Link
                href={`/services?lang=${lang}`}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive("/services") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.nav.services}
              </Link>
              <Link
                href={`/about?lang=${lang}`}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive("/about") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.nav.about}
              </Link>
              <Link
                href={`/contact?lang=${lang}`}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive("/contact") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.nav.contact}
              </Link>
              <div className="pt-2 mt-4 border-t border-gray-100">
                <SocialMediaIcons variant="header" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
