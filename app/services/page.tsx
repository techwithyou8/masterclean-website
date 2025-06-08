import type { Metadata } from "next"
import { Suspense } from "react"
import LayoutWrapper from "@/components/LayoutWrapper"
import ServicesPage from "@/components/pages/ServicesPage"
import { PageLoadingSpinner } from "@/components/LoadingSpinner"

export const metadata: Metadata = {
  title: "Onze Diensten - MasterClean | Professionele Schoonmaakdiensten",
  description:
    "Ontdek onze professionele schoonmaakdiensten: vakantiehuizen, kantoorschoonmaak en algemene schoonmaak in Zeeland en Noord-Holland.",
  keywords: "schoonmaakdiensten, vakantiehuizen schoonmaken, kantoor schoonmaak, professionele schoonmaak",
}

interface ServicesPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function Services({ searchParams }: ServicesPageProps) {
  const resolvedSearchParams = await searchParams
  const lang = resolvedSearchParams.lang || "nl"
  
  return (
    <Suspense fallback={<PageLoadingSpinner />}>
      <LayoutWrapper lang={lang}>
        <ServicesPage searchParams={resolvedSearchParams} />
      </LayoutWrapper>
    </Suspense>
  )
}
