"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      window.scrollTo(0, 0)
    }
  }

  if (!visible) return null

  return (
    <>
      {/* Mobile position (left, above contact bar, safe-area aware) */}
      <div className="fixed left-6 md:hidden z-50" style={{ bottom: 'calc(env(safe-area-inset-bottom) + 6rem)' }}>
        <Button
          size="icon"
          className="rounded-full w-12 h-12 bg-gray-800 text-white hover:bg-gray-900 shadow-2xl"
          aria-label="Terug naar boven"
          onClick={scrollToTop}
          onPointerDown={() => { try { window.navigator?.vibrate?.(10) } catch {} }}
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>
      {/* Desktop position (bottom-right) */}
      <div className="hidden md:block fixed right-6 bottom-8 z-50">
        <Button
          size="icon"
          className="rounded-full w-10 h-10 bg-gray-800 text-white hover:bg-gray-900 shadow-lg"
          aria-label="Back to top"
          onClick={scrollToTop}
          onPointerDown={() => { try { window.navigator?.vibrate?.(10) } catch {} }}
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      </div>
    </>
  )
}

