"use client"

import type React from "react"

import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { getTranslations } from "@/lib/translations"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const searchParams = useSearchParams()
  const lang = searchParams.get("lang") || "nl"
  const translations = getTranslations(lang)

  return (
    <>
      <Header translations={translations} lang={lang} />
      {children}
      <Footer translations={translations} lang={lang} />
    </>
  )
}
