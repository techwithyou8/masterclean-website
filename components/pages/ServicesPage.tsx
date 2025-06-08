"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Building, Sparkles, ArrowRight, CheckCircle, Clock, Users, Shield, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getTranslations } from "@/lib/translations"
import React, { memo } from "react"

interface ServicesPageProps {
  searchParams: { lang?: string }
}

interface ServiceItem {
  icon: React.ElementType;
  image: string;
  title: string;
  description: string;
  detailedFeatures: string[];
}
interface BenefitItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

// Memoized CardList for benefits
const CardList = memo(function CardList({ items }: { items: BenefitItem[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {items.map((benefit, index) => (
        <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <benefit.icon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
})

export default function ServicesPage({ searchParams }: ServicesPageProps) {
  const lang = searchParams.lang || "nl"
  const t = getTranslations(lang)

  // Map services and benefits from translations
  const serviceKeys = ["vacation", "office", "general"] as const
  const services = t.services.detailed.map((service, idx: number): ServiceItem => ({
    ...service,
    icon: [Home, Building, Sparkles][idx],
    image: [
      "/vacation-home-cleaning.png",
      "/office-cleaning-service.png",
      "/residential-cleaning-service.png"
    ][idx],
    title: t.services[serviceKeys[idx] as "vacation" | "office" | "general"].title,
    description: t.services[serviceKeys[idx] as "vacation" | "office" | "general"].description,
    detailedFeatures: service.features,
  }))
  const benefits = t.services.benefits.map((benefit, idx: number): BenefitItem => ({
    ...benefit,
    icon: [CheckCircle, Clock, Users, Shield][idx] || CheckCircle,
  }))

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-orange-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">{t.services.title}</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">{t.services.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href={`/contact?lang=${lang}`}>
                {t.services.cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold" asChild>
              <a href="tel:+31850805636">
                <Phone className="w-5 h-5 mr-2" />
                {t.nav.callNow}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Services Detail Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={index}
                id={index === 0 ? "vacation" : index === 1 ? "office" : "general"}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={600}
                      height={400}
                      className="w-full h-auto"
                      priority={index === 0} // Priority for the first image, lazy for others
                    />
                    <div className="absolute top-6 left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <service.icon className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                    <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.detailedFeatures.map((feature: string, featureIndex: number) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                      <Link href={`/contact?lang=${lang}`}>
                        {t.services.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold" asChild>
                      <a href="tel:+31850805636">
                        <Phone className="w-4 h-4 mr-2" />
                        {t.nav.callNow}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.about.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.about.description}</p>
          </div>
          <CardList items={benefits} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{t.hero.cta}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href={`/contact?lang=${lang}`}>
                {t.services.cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold animate-pulse" asChild>
              <a href="tel:+31850805636">
                <Phone className="w-5 h-5 mr-2" />
                {t.nav.callNow}: {t.hero.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
