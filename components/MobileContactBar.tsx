"use client"

import { Phone, MessageCircle, Mail } from "lucide-react"
import { usePathname } from "next/navigation"

export default function MobileContactBar() {
  const pathname = usePathname()
  // Hide on contact page
  if (pathname && pathname.startsWith("/contact")) return null

  const haptic = () => {
    try { window.navigator?.vibrate?.(15) } catch {}
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          <a href="tel:+31850805636" className="flex items-center justify-center py-3 text-gray-800 hover:text-orange-600 transition-colors" aria-label="Bel MasterClean" onPointerDown={haptic}>
            <div className="flex flex-col items-center">
              <Phone className="w-5 h-5" />
              <span className="text-xs mt-1">Bel</span>
            </div>
          </a>
          <a href="https://wa.me/31645087592" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center py-3 text-gray-800 hover:text-green-600 transition-colors" aria-label="WhatsApp MasterClean" onPointerDown={haptic}>
            <div className="flex flex-col items-center">
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs mt-1">App</span>
            </div>
          </a>
          <a href="mailto:info@mastercleanservice.nl" className="flex items-center justify-center py-3 text-gray-800 hover:text-blue-600 transition-colors" aria-label="E-mail MasterClean" onPointerDown={haptic}>
            <div className="flex flex-col items-center">
              <Mail className="w-5 h-5" />
              <span className="text-xs mt-1">Mail</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

