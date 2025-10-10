'use client'

import { ReactNode, Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { PageLoadingSpinner } from '@/components/LoadingSpinner'

// Dynamic import van 3D scene voor betere performance en client-side rendering
const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false, // Disable server-side rendering voor 3D content
  loading: () => (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 to-slate-200" />
  )
})

// =====================================================
// UI OVERLAY CONFIGURATIE
// =====================================================

const OVERLAY_CONFIG = {
  // Achtergrond opacity voor content secties
  sectionBackground: 'bg-white/85 backdrop-blur-sm',
  
  // Hover effects
  sectionHover: 'hover:bg-white/95 transition-all duration-300',
  
  // Spacing en padding
  spacing: {
    section: 'py-16 md:py-24',
    container: 'px-4 sm:px-6 lg:px-8'
  },
  
  // Animatie instellingen
  animation: {
    fadeIn: 'animate-in fade-in duration-700',
    slideUp: 'animate-in slide-in-from-bottom-4 duration-500'
  }
}

// =====================================================
// CONTENT SECTION WRAPPER
// =====================================================

interface ContentSectionProps {
  children: ReactNode
  id?: string
  className?: string
  variant?: 'transparent' | 'solid' | 'glass'
}

function ContentSection({ 
  children, 
  id, 
  className = "", 
  variant = 'glass' 
}: ContentSectionProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'transparent':
        return 'bg-transparent'
      case 'solid':
        return 'bg-white'
      case 'glass':
      default:
        return `${OVERLAY_CONFIG.sectionBackground} ${OVERLAY_CONFIG.sectionHover}`
    }
  }

  return (
    <section
      id={id}
      className={`
        relative 
        ${OVERLAY_CONFIG.spacing.section}
        ${getVariantClasses()}
        ${OVERLAY_CONFIG.animation.fadeIn}
        ${className}
      `}
    >
      <div className={`
        container 
        mx-auto 
        max-w-7xl
        ${OVERLAY_CONFIG.spacing.container}
      `}>
        {children}
      </div>
    </section>
  )
}

// =====================================================
// HOOFD 3D LAYOUT WRAPPER
// =====================================================

interface Layout3DProps {
  children: ReactNode
  showParallax?: boolean
  className?: string
}

export default function Layout3D({ 
  children, 
  showParallax = true,
  className = "" 
}: Layout3DProps) {
  const [shouldLoad3D, setShouldLoad3D] = useState(false)
  const [isHighPerformance, setIsHighPerformance] = useState(true)

  useEffect(() => {
    // Detecteer device capabilities
    const checkPerformance = () => {
      const isDesktop = window.innerWidth >= 1024
      const hasGoodConnection = !(navigator as any).connection || (navigator as any).connection.effectiveType !== 'slow-2g'
      const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const hasWebGL = !!document.createElement('canvas').getContext('webgl')
      
      const shouldEnable3D = isDesktop && hasGoodConnection && !isReducedMotion && hasWebGL
      setShouldLoad3D(shouldEnable3D && showParallax)
      setIsHighPerformance(shouldEnable3D)
    }

    checkPerformance()
    
    // Luister naar resize voor responsive updates
    window.addEventListener('resize', checkPerformance)
    return () => window.removeEventListener('resize', checkPerformance)
  }, [showParallax])

  return (
    <div className={`relative min-h-screen layout-3d-wrapper scroll-optimized ${className}`}>
      {/* 3D Achtergrond Scene - alleen laden als performance het toelaat */}
      {shouldLoad3D ? (
        <Suspense fallback={<div className="scene-3d-fixed bg-gradient-to-br from-blue-50 to-orange-50" />}>
          <div className="scene-3d-fixed">
            <Scene3D />
          </div>
        </Suspense>
      ) : (
        // Fallback gradient voor lagere performance devices
        <div className="scene-3d-fixed bg-gradient-to-br from-blue-50 via-slate-50 to-orange-50" />
      )}
      
      {/* Content Overlay - geoptimaliseerd voor scroll */}
      <div className="content-overlay relative z-10">
        {children}
      </div>
      
      {/* Adaptieve gradient overlay */}
      <div className={`
        fixed 
        inset-0 
        -z-5
        ${isHighPerformance 
          ? 'bg-gradient-to-b from-transparent via-white/5 to-white/20' 
          : 'bg-gradient-to-b from-transparent via-white/10 to-white/30'
        }
        pointer-events-none
        transform 
        translate-z-0
      `} />
    </div>
  )
}

// =====================================================
// EXPORT CONTENT SECTION VOOR GEBRUIK IN ANDERE FILES
// =====================================================

export { ContentSection }

// =====================================================
// INSTRUCTIES VOOR GEBRUIK:
// =====================================================
/*
1. BASIC GEBRUIK:
   Wrap je pagina content in Layout3D:
   
   <Layout3D>
     <Header />
     <ContentSection variant="glass">
       <Hero />
     </ContentSection>
     <ContentSection variant="solid">
       <Services />
     </ContentSection>
   </Layout3D>

2. CONTENT SECTION VARIANTEN:
   - 'transparent': Volledig transparant
   - 'solid': Volledig wit (voor belangrijke content)
   - 'glass': Semi-transparant met blur effect (aanbevolen)

3. RESPONSIVE DESIGN:
   - Automatische padding en margins
   - Mobile-first approach
   - Touch-friendly op tablets/phones

4. PERFORMANCE OPTIMALISATIE:
   - 3D scene wordt pas geladen na UI
   - Lazy loading van zware componenten
   - Fallback backgrounds tijdens laden

5. AANPASSINGEN:
   - Wijzig OVERLAY_CONFIG voor andere styling
   - Pas sectionBackground aan voor meer/minder transparantie
   - Verander animation settings voor andere effecten
*/