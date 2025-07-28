import type { Metadata } from "next"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import Hero from "@/components/Hero"
import LayoutWrapper from "@/components/LayoutWrapper"
import { PageLoadingSpinner } from "@/components/LoadingSpinner"
import { ServicesSkeleton, ContactSkeleton, AboutSkeleton } from "@/components/SkeletonComponents"
import { getTranslations } from "@/lib/translations"

// Dynamic imports for better code splitting and faster initial load
const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <ServicesSkeleton />
})
const About = dynamic(() => import("@/components/About"), {
  loading: () => <AboutSkeleton />
})
const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <ContactSkeleton />
})

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
  searchParams: Promise<{ lang?: string }>
}

interface HomeContentProps {
  searchParams: { lang?: string }
}

async function HomeContent({ searchParams }: HomeContentProps) {
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

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams
  const lang = resolvedSearchParams.lang || "nl"
  
  return (
    <Suspense fallback={<PageLoadingSpinner />}>
      <LayoutWrapper lang={lang}>
        <HomeContent searchParams={resolvedSearchParams} />
      </LayoutWrapper>
    </Suspense>
  )
}
