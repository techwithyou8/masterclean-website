import type { Metadata } from "next"
import { Suspense } from "react"
import LayoutWrapper from "@/components/LayoutWrapper"
import EmailTestComponent from "@/components/EmailTestComponent"

export const metadata: Metadata = {
  title: "Email Test - MasterClean",
  description: "Test the email functionality with Resend API",
}

interface TestEmailPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function TestEmailPage({ searchParams }: TestEmailPageProps) {
  const resolvedSearchParams = await searchParams
  const lang = resolvedSearchParams?.lang || "nl"
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LayoutWrapper lang={lang}>
        <main className="pt-20 pb-20 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Email Configuration Test</h1>
              <p className="text-xl text-gray-600">
                Test your Resend email configuration to ensure emails are being sent correctly
              </p>
            </div>
            <EmailTestComponent />
          </div>
        </main>
      </LayoutWrapper>
    </Suspense>
  )
}
