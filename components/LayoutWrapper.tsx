import React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FloatingCallButton from "@/components/FloatingCallButton"
import { getTranslations } from "@/lib/translations"

interface LayoutWrapperProps {
  children: React.ReactNode
  lang: string
}

export default function LayoutWrapper({ children, lang }: LayoutWrapperProps) {
  const translations = getTranslations(lang)

  return (
    <div key={lang} className="min-h-screen flex flex-col">
      <Header translations={translations} lang={lang} />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer translations={translations} lang={lang} />
      <FloatingCallButton />
    </div>
  )
}
