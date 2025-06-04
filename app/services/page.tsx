import type { Metadata } from "next"
import { Suspense } from "react"
import LayoutWrapper from "@/components/LayoutWrapper"
import ServicesPage from "@/components/pages/ServicesPage"

export const metadata: Metadata = {
  title: "Onze Diensten - MasterClean | Professionele Schoonmaakdiensten",
  description:
    "Ontdek onze professionele schoonmaakdiensten: vakantiehuizen, kantoorschoonmaak en algemene schoonmaak in Zeeland en Noord-Holland.",
  keywords: "schoonmaakdiensten, vakantiehuizen schoonmaken, kantoor schoonmaak, professionele schoonmaak",
}

interface ServicesPageProps {
  searchParams: { lang?: string }
}

export default function Services({ searchParams }: ServicesPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LayoutWrapper>
        <ServicesPage searchParams={searchParams} />
      </LayoutWrapper>
    </Suspense>
  )
}
