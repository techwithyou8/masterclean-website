"use client"

import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function FloatingCallButton() {
  const pathname = usePathname()

  // Hide wherever the mobile contact bar is present (non-contact pages)
  const isContactPage = pathname?.startsWith("/contact")
  if (!isContactPage) return null

  const haptic = () => {
    try { window.navigator?.vibrate?.(15) } catch {}
  }

  return (
    <div className="fixed right-6 z-50 md:hidden" style={{ bottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)' }}>
      <div className="flex flex-col items-end gap-3">
        <Button
          size="lg"
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full w-14 h-14 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
          asChild
        >
          <a 
            href="https://wa.me/31645087592"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
            aria-label="WhatsApp MasterClean"
            onPointerDown={haptic}
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        </Button>
        <Button
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full w-14 h-14 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-pulse hover:animate-none"
          asChild
        >
          <a 
            href="tel:+31850805636" 
            className="flex items-center justify-center"
            aria-label="Bel MasterClean direct"
            onPointerDown={haptic}
          >
            <Phone className="w-6 h-6" />
          </a>
        </Button>
      </div>
    </div>
  )
}
