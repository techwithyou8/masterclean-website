"use client"

import { Button } from "@/components/ui/button"
import { Phone, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface HeroProps {
  translations: any
  lang: string
}

export default function Hero({ translations, lang }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-orange-50 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">{translations.hero.title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{translations.hero.subtitle}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg" asChild>
                <Link href={`/contact?lang=${lang}`}>
                  {translations.hero.cta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-bold animate-bounce"
                asChild
              >
                <a href="tel:+31850805636">
                  <Phone className="w-5 h-5 mr-2" />
<<<<<<< HEAD
                  BEL NU DIRECT!
=======
                  {translations.nav.callNow}
>>>>>>> b1ce85d (Initial commit)
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">{translations.hero.stats.clients}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">5★</div>
                <div className="text-sm text-gray-600">{translations.hero.stats.rating}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">{translations.hero.stats.service}</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/cleaning-team-office.png"
                alt="MasterClean professional cleaning services"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-2xl">⚡</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Professionele Service</div>
                  <div className="text-sm text-gray-600">Snel, betrouwbaar & grondig!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
