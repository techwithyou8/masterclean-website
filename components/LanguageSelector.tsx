"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface LanguageSelectorProps {
  currentLang: string
}

export default function LanguageSelector({ currentLang }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const languages = [
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "en", name: "English", flag: "🇬🇧" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0]

  const handleLanguageChange = (langCode: string) => {
    // Preserve existing query params except lang
    const params = new URLSearchParams(window.location.search)
    params.set('lang', langCode)
    router.push(`${pathname}?${params.toString()}`)
    setIsOpen(false)
    // Removed forced reload; rely on Next.js prop/state updates
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 border-2 min-w-[120px] justify-between"
      >
        <div className="flex items-center space-x-2">
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="font-medium">{currentLanguage.code.toUpperCase()}</span>
        </div>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 bg-white border-2 rounded-lg shadow-xl z-50 min-w-[180px]">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center justify-between transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  language.code === currentLang ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                </div>
                {language.code === currentLang && <span className="text-blue-600 font-bold">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
