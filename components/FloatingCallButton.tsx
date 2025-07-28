"use client"

import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FloatingCallButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <Button
        size="lg"
        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full w-14 h-14 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-pulse hover:animate-none"
        asChild
      >
        <a 
          href="tel:+31850805636" 
          className="flex items-center justify-center"
          aria-label="Bel MasterClean direct"
        >
          <Phone className="w-6 h-6" />
        </a>
      </Button>
    </div>
  )
}
