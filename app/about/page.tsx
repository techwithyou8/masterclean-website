import type { Metadata } from "next"
import { Suspense } from "react"
import LayoutWrapper from "@/components/LayoutWrapper"
import AboutPage from "@/components/pages/AboutPage"
import { PageLoadingSpinner } from "@/components/LoadingSpinner"

export const metadata: Metadata = {
  title: "Over Ons - MasterClean | Ervaren Schoonmaakprofessionals",
  description:
    "Leer meer over MasterClean, ons ervaren team en waarom wij de beste keuze zijn voor uw schoonmaakbehoeften in Zeeland en Noord-Holland.",
  keywords: "over masterclean, schoonmaakbedrijf, ervaren team, professioneel",
}

interface AboutPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function About({ searchParams }: AboutPageProps) {
  const resolvedSearchParams = await searchParams
  const lang = resolvedSearchParams.lang || "nl"
  
  return (
    <Suspense fallback={<PageLoadingSpinner />}>
      <LayoutWrapper lang={lang}>
        <AboutPage searchParams={resolvedSearchParams} />
      </LayoutWrapper>
    </Suspense>
  )
}
