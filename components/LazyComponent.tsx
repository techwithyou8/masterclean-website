"use client"

import { useEffect, useRef, useState } from 'react'

interface LazyComponentProps {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
  fallback?: React.ReactNode
}

export function LazyComponent({ 
  children, 
  threshold = 0.1, 
  rootMargin = '50px',
  fallback = null 
}: LazyComponentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  )
}
