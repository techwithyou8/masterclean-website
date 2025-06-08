"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Clock, Users, Award, CheckCircle, Star, Heart, Target, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getTranslations } from "@/lib/translations"
import React, { memo } from "react"

interface AboutPageProps {
  searchParams: { lang?: string }
}

// Memoized CardList for values and features
const CardList = memo(function CardList({ items, type, t }: { items: any[]; type: "values" | "features"; t: any }) {
  return (
    <div className={`grid ${type === "values" ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2"} gap-8`}>
      {items.map((item, index) => (
        <Card key={index} className={type === "values" ? "text-center border-0 shadow-lg hover:shadow-xl transition-shadow" : "border-0 shadow-lg hover:shadow-xl transition-shadow"}>
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <item.icon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {type === "values" ? item.title : t.about.features[item.titleKey].title}
            </h3>
            <p className="text-gray-600">
              {type === "values" ? item.description : t.about.features[item.descKey].description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
})

export default function AboutPage({ searchParams }: AboutPageProps) {
  const lang = searchParams.lang || "nl"
  const t = getTranslations(lang)

  const features = [
    {
      icon: Shield,
      titleKey: "insured",
      descKey: "insured",
    },
    {
      icon: Clock,
      titleKey: "flexible",
      descKey: "flexible",
    },
    {
      icon: Users,
      titleKey: "experienced",
      descKey: "experienced",
    },
    {
      icon: Award,
      titleKey: "quality",
      descKey: "quality",
    },
  ]

  const values = [
    {
      icon: CheckCircle,
      title: "Betrouwbaarheid",
      description:
        "Wij staan voor onze afspraken en leveren altijd wat we beloven. Punctualiteit en consistentie zijn onze kernwaarden.",
    },
    {
      icon: Star,
      title: "Kwaliteit",
      description:
        "Alleen het beste is goed genoeg. Wij gebruiken professionele apparatuur en hoogwaardige, milieuvriendelijke producten.",
    },
    {
      icon: Heart,
      title: "Klanttevredenheid",
      description: "Uw tevredenheid is ons doel. Wij gaan altijd de extra mijl om uw verwachtingen te overtreffen.",
    },
    {
      icon: Target,
      title: "Precisie",
      description:
        "Elk detail telt. Ons team is getraind om ook de kleinste hoekjes en gaatjes grondig schoon te maken.",
    },
  ]

  const stats = [
    { number: "500+", label: t.about.experience },
    { number: "10+", label: t.about.experience },
    { number: "24/7", label: "Service Beschikbaar" },
    { number: "100%", label: t.about.features.quality.title },
  ]

  const teamMembers = [
    {
      name: "Mike Hendrix",
      role: "Eigenaar & Operationeel Manager",
      experience: "10 jaar ervaring",
      image: "/team-michael.png",
    },
    {
      name: "Jan Pietersen",
      role: "Teamleider Kantoorschoonmaak",
      experience: "8 jaar ervaring",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Sophie de Vries",
      role: "Specialist Vakantiehuizen",
      experience: "6 jaar ervaring",
      image: "/team-sophie.png",
    },
  ]

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">{t.about.title}</h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{t.about.description}</p>
              <div className="flex items-center space-x-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">10+</div>
                  <div className="text-gray-600">{t.about.experience}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500">500+</div>
                  <div className="text-gray-600">{t.about.features.quality.title}</div>
                </div>
              </div>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold" asChild>
                <a href="tel:+31850805636">
                  <Phone className="w-5 h-5 mr-2" />
                  {t.nav.callNow} {t.hero.phone}
                </a>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/professional-cleaning-team.png"
                alt="MasterClean team"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold text-blue-600">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Onze Waarden</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deze kernwaarden vormen de basis van alles wat wij doen en bepalen hoe wij onze klanten bedienen
            </p>
          </div>
          <CardList items={values} type="values" t={t} />
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.about.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.about.description}
            </p>
          </div>
          <CardList items={features} type="features" t={t} />
        </div>
      </section>
      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ons Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Maak kennis met de professionals die ervoor zorgen dat uw ruimtes altijd perfect schoon zijn
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
              <Link href={`/contact?lang=${lang}`}>{t.services.cta}</Link>
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
