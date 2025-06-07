"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
<<<<<<< HEAD
import { Home, Building, Sparkles, ArrowRight } from "lucide-react"
=======
import { Home, Building, Sparkles, ArrowRight, Phone } from "lucide-react"
>>>>>>> b1ce85d (Initial commit)
import Image from "next/image"
import Link from "next/link"

interface ServicesProps {
  translations: any
<<<<<<< HEAD
}

export default function Services({ translations }: ServicesProps) {
=======
  lang?: string
}

export default function Services({ translations, lang = "nl" }: ServicesProps) {
>>>>>>> b1ce85d (Initial commit)
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
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{translations.services.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{translations.services.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
<<<<<<< HEAD
                  <Link href="/contact" data-phone-number="+31 (0)85 0805636">
=======
                  <Link href={`/contact?lang=${lang}`} data-phone-number="+31 (0)85 0805636">
>>>>>>> b1ce85d (Initial commit)
                    {translations.services.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
<<<<<<< HEAD
=======
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold mt-2" asChild>
                  <a href="tel:+31850805636">
                    <Phone className="w-4 h-4 mr-2" />
                    {translations.nav.callNow}
                  </a>
                </Button>
>>>>>>> b1ce85d (Initial commit)
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
