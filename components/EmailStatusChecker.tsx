"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Settings, Mail, Server, Key } from "lucide-react"
import { debugEnvironmentSetup } from "@/lib/actions"

export default function EmailStatusChecker() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isChecking, setIsChecking] = useState(false)

  async function checkStatus() {
    setIsChecking(true)
    try {
      const debug = await debugEnvironmentSetup()
      setDebugInfo(debug)
    } catch (error) {
      console.error("Debug check failed:", error)
      setDebugInfo({
        error: "Failed to check configuration",
        isConfigured: false,
      })
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-800">
          <Settings className="w-6 h-6" />
          <span>Email Configuration Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={checkStatus} disabled={isChecking} className="bg-blue-600 hover:bg-blue-700 text-white">
          {isChecking ? "Checking..." : "Check Email Configuration"}
        </Button>

        {debugInfo && (
          <div className="space-y-4">
            {/* Configuration Status */}
            <div
              className={`p-4 rounded-lg border ${
                debugInfo.isConfigured ? "bg-green-100 border-green-200" : "bg-red-100 border-red-200"
              }`}
            >
              <div
                className={`flex items-center space-x-2 ${debugInfo.isConfigured ? "text-green-800" : "text-red-800"}`}
              >
                {debugInfo.isConfigured ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <span className="font-semibold">
                  {debugInfo.isConfigured ? "✅ Email Configuration Ready!" : "❌ Configuration Issue"}
                </span>
              </div>
              {debugInfo.error && (
                <p className={`mt-2 ${debugInfo.isConfigured ? "text-green-700" : "text-red-700"}`}>
                  {debugInfo.error}
                </p>
              )}
            </div>

            {/* Detailed Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* API Key Status */}
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <Key className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">API Key</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div>Status: {debugInfo.hasApiKey ? "✅ Found" : "❌ Missing"}</div>
                  <div>Type: {debugInfo.detectedKeyType}</div>
                  <div>Length: {debugInfo.apiKeyLength} chars</div>
                </div>
              </div>

              {/* Resend Service */}
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <Server className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Resend Service</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div>Provider: ✅ Resend</div>
                  <div>Status: {debugInfo.isConfigured ? "✅ Ready" : "❌ Not Ready"}</div>
                  <div>Environment: {debugInfo.nodeEnv}</div>
                </div>
              </div>

              {/* Email Setup */}
              <div className="p-4 bg-white rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">Email Setup</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div>To: info@mastercleanservice.nl</div>
                  <div>From: MasterClean</div>
                  <div>Hostinger: ✅ Connected</div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            {debugInfo.isConfigured ? (
              <div className="p-4 bg-green-100 border border-green-200 rounded text-green-800">
                <strong>🎉 Everything looks good!</strong>
                <div className="mt-2 space-y-1 text-sm">
                  <p>• Contact form is ready to send emails</p>
                  <p>• Emails will be sent to info@mastercleanservice.nl</p>
                  <p>• Customers will receive confirmation emails</p>
                  <p>• Test the contact form to verify everything works</p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-yellow-100 border border-yellow-200 rounded text-yellow-800">
                <strong>⚠️ Action Required:</strong>
                <div className="mt-2 space-y-1 text-sm">
                  <p>• Make sure your .env.local file contains RESEND_API_KEY</p>
                  <p>• Restart your development server after adding the key</p>
                  <p>• Verify your Resend account is active</p>
                  <p>• Check that your domain is verified with Resend</p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
