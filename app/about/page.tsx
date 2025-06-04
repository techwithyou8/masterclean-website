import type { Metadata } from "next"
import { Suspense } from "react"
import LayoutWrapper from "@/components/LayoutWrapper"
import AboutPage from "@/components/pages/AboutPage"

export const metadata: Metadata = {
  title: "Over Ons - MasterClean | Ervaren Schoonmaakprofessionals",
  description:
    "Leer meer over MasterClean, ons ervaren team en waarom wij de beste keuze zijn voor uw schoonmaakbehoeften in Zeeland en Noord-Holland.",
  keywords: "over masterclean, schoonmaakbedrijf, ervaren team, professioneel",
}

interface AboutPageProps {
  searchParams: { lang?: string }
}

export default function About({ searchParams }: AboutPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LayoutWrapper>
        <AboutPage searchParams={searchParams} />
      </LayoutWrapper>
    </Suspense>
  )
}
