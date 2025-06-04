import type { Metadata } from "next"
import { Suspense } from "react"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import About from "@/components/About"
import Contact from "@/components/Contact"
import LayoutWrapper from "@/components/LayoutWrapper"
import { getTranslations } from "@/lib/translations"

export const metadata: Metadata = {
  title: "MasterClean - Professionele Schoonmaakdiensten | Zeeland & Noord-Holland",
  description:
    "MasterClean biedt professionele schoonmaakdiensten voor vakantiehuizen, kantoren en woningen in Zeeland en Noord-Holland. Neem direct contact op!",
  keywords:
    "schoonmaakbedrijf Zeeland, schoonmaakbedrijf Noord-Holland, vakantiehuizen schoonmaken, kantoor schoonmaak, professionele schoonmaakdiensten",
  openGraph: {
    title: "MasterClean - Professionele Schoonmaakdiensten",
    description: "Professionele schoonmaakdiensten voor vakantiehuizen, kantoren en woningen",
    type: "website",
  },
}

interface HomeProps {
  searchParams: { lang?: string }
}

function HomeContent({ searchParams }: HomeProps) {
  const lang = searchParams.lang || "nl"
  const t = getTranslations(lang)

  return (
    <main>
      <Hero translations={t} lang={lang} />
      <Services translations={t} />
      <About translations={t} />
      <Contact translations={t} />
    </main>
  )
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LayoutWrapper>
        <HomeContent searchParams={searchParams} />
      </LayoutWrapper>
    </Suspense>
  )
}
