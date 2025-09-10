import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mastercleanservice.nl'),
  title: "MasterClean - Professionele Schoonmaak in Zeeland & Noord-Holland",
  description: "Professionele schoonmaak voor vakantiehuizen, kantoren en woningen in Zeeland & Noord-Holland",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/masterclean-logo-new.png"
          as="image"
          type="image/png"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="//wa.me" />
        {/* Preconnect hints */}
        <link rel="preconnect" href="https://wa.me" />
        
        {/* Prefetch next likely pages */}
        <link rel="prefetch" href="/contact" />
        <link rel="prefetch" href="/services" />
        <link rel="prefetch" href="/about" />
        
        {/* Critical CSS - inline for fastest render */}
        <style dangerouslySetInnerHTML={{
          __html: `
            *{box-sizing:border-box}
            body{margin:0;font-family:Inter,system-ui,arial;-webkit-font-smoothing:antialiased}
            .container{max-width:1200px;margin:0 auto;padding:0 1rem}
            @media(min-width:640px){.container{padding:0 1.5rem}}
            @media(min-width:1024px){.container{padding:0 2rem}}
          `
        }} />
        {/* Viewport and performance hints */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
