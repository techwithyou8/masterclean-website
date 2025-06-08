import type { Metadata } from "next"
import { Suspense } from "react"
import LayoutWrapper from "@/components/LayoutWrapper"
import ContactPage from "@/components/pages/ContactPage"
import { PageLoadingSpinner } from "@/components/LoadingSpinner"

export const metadata: Metadata = {
  title: "Contact - MasterClean | Neem Direct Contact Op",
  description:
    "Neem contact op met MasterClean voor een vrijblijvende offerte. Bel 085 0805636 of vul ons contactformulier in.",
  keywords: "contact masterclean, offerte aanvragen, telefoonnummer, email",
}

interface ContactPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function Contact({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = await searchParams
  const lang = resolvedSearchParams.lang || "nl"
  
  return (
    <Suspense fallback={<PageLoadingSpinner />}>
      <LayoutWrapper lang={lang}>
        <ContactPage searchParams={resolvedSearchParams} />
      </LayoutWrapper>
    </Suspense>
  )
}
