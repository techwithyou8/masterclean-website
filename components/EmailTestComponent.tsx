"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, AlertCircle, Send, TestTube, Settings } from "lucide-react"
import { submitContactForm, debugEnvironmentSetup } from "@/lib/actions"

export default function EmailTestComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResult, setTestResult] = useState<{
    success: boolean
    message?: string
    error?: string
  } | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [showDebug, setShowDebug] = useState(false)
  const [isDebugging, setIsDebugging] = useState(false)

  const [formData, setFormData] = useState({
    name: "Test User",
    email: "test@example.com",
    phone: "+31 6 12345678",
    message: "This is a test message to verify email functionality with Resend API.",
  })

  async function handleTest() {
    setIsSubmitting(true)
    setTestResult(null)

    try {
      const data = new FormData()
      data.append("name", formData.name)
      data.append("email", formData.email)
      data.append("phone", formData.phone)
      data.append("message", formData.message)

      const result = await submitContactForm(data)
      setTestResult(result)
    } catch (error) {
      console.error("Test failed:", error)
      setTestResult({
        success: false,
        error: "Test failed: " + (error instanceof Error ? error.message : "Unknown error"),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDebug() {
    setIsDebugging(true)
    try {
      console.log("Starting debug check...")
      const debug = await debugEnvironmentSetup()
      console.log("Debug result:", debug)
      setDebugInfo(debug)
      setShowDebug(true)
    } catch (error) {
      console.error("Debug failed:", error)
      setDebugInfo({
        error: "Failed to check configuration: " + (error instanceof Error ? error.message : "Unknown error"),
        isConfigured: false,
        hasApiKey: false,
        apiKeyLength: 0,
        apiKeyPrefix: "",
        detectedKeyType: "error",
        nodeEnv: "unknown",
      })
      setShowDebug(true)
    } finally {
      setIsDebugging(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Debug Panel */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <Settings className="w-6 h-6" />
            <span>Email Configuration Debug</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleDebug}
            disabled={isDebugging}
            variant="outline"
            className="border-blue-300 text-blue-700"
          >
            {isDebugging ? "Checking..." : "Check Email Configuration"}
          </Button>

          {showDebug && debugInfo && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Environment:</strong> {debugInfo.nodeEnv || "unknown"}
                </div>
                <div>
                  <strong>Has API Key:</strong> {debugInfo.hasApiKey ? "✅ Yes" : "❌ No"}
                </div>
                <div>
                  <strong>Key Type:</strong> {debugInfo.detectedKeyType || "unknown"}
                </div>
                <div>
                  <strong>Configured:</strong> {debugInfo.isConfigured ? "✅ Ready" : "❌ Not Ready"}
                </div>
              </div>

              {debugInfo.error && (
                <div className="p-4 bg-red-100 border border-red-200 rounded text-red-800">
                  <strong>❌ Configuration Error:</strong>
                  <p className="mt-2">{debugInfo.error}</p>
                  <div className="mt-4 text-sm">
                    <p>
                      <strong>Quick Fix:</strong>
                    </p>
                    <ol className="list-decimal list-inside space-y-1 mt-2">
                      <li>
                        Create a file named <code className="bg-red-200 px-1 rounded">.env.local</code> in your project
                        root
                      </li>
                      <li>
                        Add your Resend API key:{" "}
                        <code className="bg-red-200 px-1 rounded">RESEND_API_KEY=re_your_key_here</code>
                      </li>
                      <li>Restart your development server</li>
                      <li>Click "Check Email Configuration" again</li>
                    </ol>
                  </div>
                </div>
              )}

              {debugInfo.isConfigured && (
                <div className="p-4 bg-green-100 border border-green-200 rounded text-green-800">
                  <strong>✅ Email Configuration is Ready!</strong>
                  <p className="mt-2">Resend API is properly configured and ready to send emails.</p>
                  <div className="mt-3 text-sm">
                    <p>
                      <strong>Configuration Details:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>API Key Length: {debugInfo.apiKeyLength} characters</li>
                      <li>Key Prefix: {debugInfo.apiKeyPrefix}</li>
                      <li>Environment: {debugInfo.nodeEnv}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TestTube className="w-6 h-6" />
            <span>Email Test Form</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              rows={4}
            />
          </div>

          <Button onClick={handleTest} disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending Test Email...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Send Test Email</span>
              </div>
            )}
          </Button>

          {testResult && (
            <div
              className={`p-4 rounded-lg border ${
                testResult.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}
            >
              <div className={`flex items-center space-x-2 ${testResult.success ? "text-green-800" : "text-red-800"}`}>
                {testResult.success ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <span className="font-semibold">{testResult.success ? "Success!" : "Error"}</span>
              </div>
              <p className={`mt-2 ${testResult.success ? "text-green-700" : "text-red-700"}`}>
                {testResult.success ? testResult.message : testResult.error}
              </p>

              {testResult.success && (
                <div className="mt-4 p-3 bg-blue-100 border border-blue-200 rounded text-blue-800">
                  <strong>📧 What happens next:</strong>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Email sent to info@mastercleanservice.nl</li>
                    <li>• Confirmation email sent to {formData.email}</li>
                    <li>• Check both inboxes (including spam folders)</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-yellow-800 mb-3">📋 Testing Instructions</h3>
          <div className="space-y-2 text-sm text-yellow-700">
            <p>
              <strong>1.</strong> First, click "Check Email Configuration" to verify your setup
            </p>
            <p>
              <strong>2.</strong> If configuration is ready, send a test email
            </p>
            <p>
              <strong>3.</strong> Check info@mastercleanservice.nl for the contact form submission
            </p>
            <p>
              <strong>4.</strong> Check the test email address for the confirmation email
            </p>
            <p>
              <strong>5.</strong> Check spam folders if emails don't appear in inbox
            </p>
          </div>

          {!showDebug && (
            <div className="mt-4 p-3 bg-blue-100 border border-blue-200 rounded text-blue-800">
              <strong>💡 Tip:</strong> Start by checking your email configuration first to ensure everything is set up
              correctly.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
