import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface FooterProps {
  translations: any
  lang: string
}

export default function Footer({ translations, lang }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/masterclean-logo-transparent.png"
                alt="MasterClean"
                width={140}
                height={35}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-400">{translations.footer.description}</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold" asChild>
              <a href="tel:+31850805636">
                <Phone className="w-4 h-4 mr-2" />
                BEL NU
              </a>
            </Button>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{translations.footer.services.title}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href={`/services?lang=${lang}#vacation`} className="hover:text-white transition-colors">
                  {translations.footer.services.vacation}
                </Link>
              </li>
              <li>
                <Link href={`/services?lang=${lang}#office`} className="hover:text-white transition-colors">
                  {translations.footer.services.office}
                </Link>
              </li>
              <li>
                <Link href={`/services?lang=${lang}#general`} className="hover:text-white transition-colors">
                  {translations.footer.services.general}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{translations.footer.contact.title}</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+31850805636" className="hover:text-white transition-colors">
                  <span>+31 (0)85 0805636</span>
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@mastercleanservice.nl" className="hover:text-white transition-colors">
                  info@mastercleanservice.nl
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{translations.footer.contact.area}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{translations.footer.links.title}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href={`/?lang=${lang}`} className="hover:text-white transition-colors">
                  {translations.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/services?lang=${lang}`} className="hover:text-white transition-colors">
                  {translations.nav.services}
                </Link>
              </li>
              <li>
                <Link href={`/about?lang=${lang}`} className="hover:text-white transition-colors">
                  {translations.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/contact?lang=${lang}`} className="hover:text-white transition-colors">
                  {translations.nav.contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MasterClean. {translations.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
