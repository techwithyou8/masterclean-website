import React from "react"

interface LoadingSpinnerProps {
  message?: string
  className?: string
}

export default function LoadingSpinner({ message = "Loading...", className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[200px] ${className}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      <p className="mt-4 text-gray-600 text-lg">{message}</p>
    </div>
  )
}

export function PageLoadingSpinner() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16 bg-white border-b border-gray-200 animate-pulse"></div>
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner message="Pagina wordt geladen..." />
      </div>
      <div className="h-32 bg-gray-50 animate-pulse"></div>
    </div>
  )
}
