import React from "react"
import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import SocialMediaIcons from "./SocialMediaIcons"
import Image from "next/image"

interface FooterProps {
  translations: any
  lang: string
}

export default function Footer({ translations, lang }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1 space-y-6">
              <div className="flex items-center">
                <Image
                  src="/mastercerclean-footer-logo.png"
                  alt="MasterCerClean"
                  width={240}
                  height={60}
                  className="h-12 sm:h-16 w-auto object-contain"
                  loading="lazy"
                  quality={85}
                />
              </div>
              <div className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {translations.footer.description}
                </p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p className="font-medium">K.V.K 96538414</p>
                  <p className="font-medium">BTW NL005215222B17</p>
                </div>
              </div>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto" 
                asChild
              >
                <a href="tel:+31850805636" className="flex items-center justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {translations.footer.callButton}
                </a>
              </Button>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-blue-600 pb-2 mb-4">
                {translations.footer.services.title}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href={`/services?lang=${lang}#vacation`} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-blue-400"></span>
                    {translations.footer.services.vacation}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/services?lang=${lang}#office`} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-blue-400"></span>
                    {translations.footer.services.office}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/services?lang=${lang}#general`} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-blue-400"></span>
                    {translations.footer.services.general}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-blue-600 pb-2 mb-4">
                {translations.footer.contact.title}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Telefoon</p>
                    <a 
                      href="tel:+31850805636" 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
                    >
                      +31 (0)85 0805636
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">E-mail</p>
                    <a 
                      href="mailto:info@mastercleanservice.nl" 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
                    >
                      info@mastercleanservice.nl
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Werkgebied</p>
                    <span className="text-gray-300 font-medium">{translations.footer.contact.area}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media & Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-blue-600 pb-2 mb-4">
                {translations.footer.links.title}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href={`/?lang=${lang}`} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-blue-400"></span>
                    {translations.nav.home}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/services?lang=${lang}`} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-blue-400"></span>
                    {translations.nav.services}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/about?lang=${lang}`} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-blue-400"></span>
                    {translations.nav.about}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/contact?lang=${lang}`} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 group-hover:bg-blue-400"></span>
                    {translations.nav.contact}
                  </Link>
                </li>
              </ul>

              <div className="pt-4 border-t border-gray-700">
                <h4 className="text-lg font-semibold mb-4 text-white">Volg ons</h4>
                <SocialMediaIcons variant="footer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                &copy; 2025 MasterCerClean. {translations.footer.rights}
              </p>
            </div>
            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <span>Professionele schoonmaakdienst</span>
              <span>•</span>
              <span>Betrouwbaar & Gecertificeerd</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
