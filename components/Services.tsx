"use client"

import { memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Building, Sparkles, ArrowRight, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ServicesProps {
  translations: any
  lang?: string
}

const Services = memo(function Services({ translations, lang = "nl" }: ServicesProps) {
  const services = [
    {
      icon: Home,
      title: translations.services.vacation.title,
      description: translations.services.vacation.description,
      features: translations.services.vacation.features,
      image: "/vacation-home-cleaning.png",
    },
    {
      icon: Building,
      title: translations.services.office.title,
      description: translations.services.office.description,
      features: translations.services.office.features,
      image: "/office-cleaning-service.png",
    },
    {
      icon: Sparkles,
      title: translations.services.general.title,
      description: translations.services.general.description,
      features: translations.services.general.features,
      image: "/residential-cleaning-service.png",
    },
  ]

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{translations.services.title}</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">{translations.services.subtitle}</p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:scale-105 transform bg-white overflow-hidden">
              <div className="relative overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  quality={80}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>

              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-gray-900 mb-2">{service.title}</CardTitle>
                <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                      <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 pt-4">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" asChild>
                    <Link href={`/contact?lang=${lang}`} className="flex items-center justify-center">
                      {translations.services.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" asChild>
                    <a href="tel:+31850805636" className="flex items-center justify-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {translations.nav.callNow}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Services
