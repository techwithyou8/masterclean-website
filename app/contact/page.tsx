import type { Metadata } from "next"
import { Suspense } from "react"
import LayoutWrapper from "@/components/LayoutWrapper"
import ContactPage from "@/components/pages/ContactPage"

export const metadata: Metadata = {
  title: "Contact - MasterClean | Neem Direct Contact Op",
  description:
    "Neem contact op met MasterClean voor een vrijblijvende offerte. Bel 085 0805636 of vul ons contactformulier in.",
  keywords: "contact masterclean, offerte aanvragen, telefoonnummer, email",
}

interface ContactPageProps {
  searchParams: { lang?: string }
}

export default function Contact({ searchParams }: ContactPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LayoutWrapper>
        <ContactPage searchParams={searchParams} />
      </LayoutWrapper>
    </Suspense>
  )
}
