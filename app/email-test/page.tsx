import type { Metadata } from "next"
import { Suspense } from "react"
import LayoutWrapper from "@/components/LayoutWrapper"
import EmailTestComponent from "@/components/EmailTestComponent"
import EmailStatusChecker from "@/components/EmailStatusChecker"

export const metadata: Metadata = {
  title: "Email Test - MasterClean",
  description: "Test and verify email functionality",
}

interface EmailTestPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function EmailTestPage({ searchParams }: EmailTestPageProps) {
  const resolvedSearchParams = await searchParams
  const lang = resolvedSearchParams?.lang || "nl"
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LayoutWrapper lang={lang}>
        <main className="pt-20 pb-20 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Email System Test</h1>
              <p className="text-xl text-gray-600">Verify that your email configuration is working correctly</p>
            </div>

            <div className="space-y-8">
              <EmailStatusChecker />
              <EmailTestComponent />
            </div>
          </div>
        </main>
      </LayoutWrapper>
    </Suspense>
  )
}
