"use client"
import React, { memo } from "react"

import { Button } from "@/components/ui/button"
import { Phone, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface HeroProps {
  translations: any
  lang: string
}

const Hero = memo(function Hero({ translations, lang }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-orange-50 min-h-[calc(100vh-5rem)] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {translations.hero.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {translations.hero.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                asChild
              >
                <Link href={`/contact?lang=${lang}`} className="flex items-center justify-center">
                  {translations.hero.cta}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulse hover:animate-none"
                asChild
              >
                <a href="tel:+31850805636" className="flex items-center justify-center">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {translations.nav.callNow}
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 sm:space-x-8 pt-6 lg:pt-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">460+</div>
                <div className="text-xs sm:text-sm text-gray-600">{translations.hero.stats.clients}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-500">4.9★</div>
                <div className="text-xs sm:text-sm text-gray-600">{translations.hero.stats.rating}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-xs sm:text-sm text-gray-600">{translations.hero.stats.service}</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl">
              <Image
                src="/cleaning-team-office.png"
                alt="MasterClean professional cleaning services"
                width={800}
                height={600}
                className="w-full h-auto object-cover aspect-[4/3]"
                priority
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
            </div>

            {/* Floating card - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs backdrop-blur-sm bg-white/95">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-2xl">⚡</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{translations.hero.features.professional.title}</div>
                  <div className="text-xs text-gray-600">{translations.hero.features.professional.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default Hero
