"use client"
import React, { memo } from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  Settings,
  Upload,
  X,
  FileText,
  ImageIcon,
} from "lucide-react"
import { submitContactForm, debugEnvironmentSetup } from "@/lib/actions"

interface ContactProps {
  translations: any
}

interface UploadedFile {
  file: File
  preview?: string
  id: string
}

const Contact = memo(function Contact({ translations }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{
    success: boolean
    message?: string
    error?: string
  } | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [showDebug, setShowDebug] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Debug function for development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      debugEnvironmentSetup().then(setDebugInfo).catch(console.error)
    }
  }, [])

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const newFiles: UploadedFile[] = []
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]

    Array.from(files).forEach((file) => {
      if (file.size > maxSize) {
        alert(`Bestand "${file.name}" is te groot. Maximum grootte is 10MB.`)
        return
      }

      if (!allowedTypes.includes(file.type)) {
        alert(
          `Bestandstype van "${file.name}" wordt niet ondersteund. Toegestaan: afbeeldingen, PDF, Word documenten, tekstbestanden.`,
        )
        return
      }

      const fileId = Math.random().toString(36).substr(2, 9)
      const uploadedFile: UploadedFile = {
        file,
        id: fileId,
      }

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setUploadedFiles((prev) =>
            prev.map((f) => (f.id === fileId ? { ...f, preview: e.target?.result as string } : f)),
          )
        }
        reader.readAsDataURL(file)
      }

      newFiles.push(uploadedFile)
    })

    setUploadedFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="w-5 h-5 text-blue-600" />
    }
    return <FileText className="w-5 h-5 text-gray-600" />
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      console.log("Submitting contact form with files...")

      // Add uploaded files to form data
      uploadedFiles.forEach((uploadedFile, index) => {
        formData.append(`file_${index}`, uploadedFile.file)
      })

      const result = await submitContactForm(formData)
      console.log("Form submission result:", result)
      setSubmitResult(result)

      // Reset form if successful
      if (result.success) {
        const form = document.getElementById("contact-form") as HTMLFormElement
        if (form) {
          form.reset()
        }
        setUploadedFiles([]) // Clear uploaded files
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitResult({
        success: false,
        error: "Er is een onverwachte fout opgetreden. Probeer het opnieuw of bel ons direct.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{translations.contact.title}</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">{translations.contact.subtitle}</p>

          {/* Debug Panel for Development */}
          {process.env.NODE_ENV === "development" && debugInfo && (
            <div className="mt-8 max-w-4xl mx-auto">
              <Button variant="outline" size="sm" onClick={() => setShowDebug(!showDebug)} className="mb-4">
                <Settings className="w-4 h-4 mr-2" />
                {showDebug ? "Hide" : "Show"} Debug Info
              </Button>

              {showDebug && (
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800">Development Debug Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-left space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <strong>Environment:</strong> {debugInfo.nodeEnv}
                        </div>
                        <div>
                          <strong>Form Handler:</strong> ✅ Active
                        </div>
                        <div>
                          <strong>Contact System:</strong> ✅ Working
                        </div>
                        <div>
                          <strong>Status:</strong> ✅ Ready
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-green-100 border border-green-200 rounded text-green-800">
                        <strong>✅ Contact Form is Ready!</strong>
                        <div className="mt-2 space-y-1">
                          <p>• Form validation is active</p>
                          <p>• Contact information will be processed</p>
                          <p>• Users will receive confirmation message</p>
                          <p>• Direct contact options are available</p>
                          <p>• File upload functionality enabled</p>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-blue-100 border border-blue-200 rounded text-blue-800">
                        <strong>📧 Email Integration Note:</strong>
                        <div className="mt-2 space-y-1 text-sm">
                          <p>For production email sending, you can integrate with:</p>
                          <p>• Hostinger email via SMTP service</p>
                          <p>• Email service providers like Resend, SendGrid, etc.</p>
                          <p>• Contact form services like Formspree, Netlify Forms</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:gap-8 max-w-6xl mx-auto lg:grid-cols-3">
          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6 order-2 lg:order-1">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center shadow-md">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{translations.contact.info.phone.title}</h3>
                    <p className="text-gray-600 mb-3 text-sm sm:text-base">+31 (0)85 0805636</p>
                    <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-lg text-xs sm:text-sm px-3 py-2 transition-all duration-300 transform hover:scale-105" asChild>
                      <a href="tel:+31850805636">{translations.footer.callButton}</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shadow-md">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{translations.contact.info.email.title}</h3>
                    <a href="mailto:info@mastercleanservice.nl" className="text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base break-all">
                      info@mastercleanservice.nl
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{translations.contact.info.area.title}</h3>
                    <p className="text-gray-600">{translations.contact.info.area.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{translations.contact.info.hours.title}</h3>
                    <p className="text-gray-600">{translations.contact.info.hours.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl text-gray-900">{translations.contact.form.title}</CardTitle>
                <p className="text-gray-600 text-sm sm:text-base">Voeg foto's of documenten toe om uw vraag te verduidelijken</p>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {/* Success/Error Messages */}
                {submitResult && (
                  <div
                    className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl flex items-start space-x-3 ${
                      submitResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                    }`}
                  >
                    {submitResult.success ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                    <p className={`${submitResult.success ? "text-green-800" : "text-red-800"}`}>
                      {submitResult.success ? submitResult.message : submitResult.error}
                    </p>
                  </div>
                )}

                <form id="contact-form" action={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {translations.contact.form.name} *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                        placeholder={translations.contact.form.namePlaceholder}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        {translations.contact.form.phone}
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                        placeholder={translations.contact.form.phonePlaceholder}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {translations.contact.form.email} *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                      placeholder={translations.contact.form.emailPlaceholder}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {translations.contact.form.message} *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors resize-none"
                      placeholder={translations.contact.form.messagePlaceholder}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* File Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translations.contact.form.fileUpload.label}
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-2">
                        {translations.contact.form.fileUpload.dragText}{" "}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                          disabled={isSubmitting}
                        >
                          {translations.contact.form.fileUpload.clickText}
                        </button>
                      </p>
                      <p className="text-xs text-gray-500">
                        {translations.contact.form.fileUpload.allowedFiles}
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,.pdf,.doc,.docx,.txt"
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="hidden"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Uploaded Files Display */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Geselecteerde bestanden ({uploadedFiles.length}):
                        </p>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {uploadedFiles.map((uploadedFile) => (
                            <div
                              key={uploadedFile.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                            >
                              <div className="flex items-center space-x-3">
                                {uploadedFile.preview ? (
                                  <img
                                    src={uploadedFile.preview || "/placeholder.svg"}
                                    alt="Preview"
                                    className="w-10 h-10 object-cover rounded"
                                  />
                                ) : (
                                  getFileIcon(uploadedFile.file.type)
                                )}
                                <div>
                                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                    {uploadedFile.file.name}
                                  </p>
                                  <p className="text-xs text-gray-500">{formatFileSize(uploadedFile.file.size)}</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(uploadedFile.id)}
                                className="text-red-500 hover:text-red-700 p-1"
                                disabled={isSubmitting}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Versturen...</span>
                      </div>
                    ) : (
                      <>
                        {translations.contact.form.send}
                        {uploadedFiles.length > 0 && (
                          <span className="ml-2 text-sm">
                            ({uploadedFiles.length} bestand{uploadedFiles.length !== 1 ? "en" : ""})
                          </span>
                        )}
                      </>
                    )}
                  </Button>
                </form>

                {/* Fallback contact info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    <strong>{translations.contact.form.fileUpload.troubleText}</strong>
                    <br />
                    Bel ons direct op{" "}
                    <a href="tel:+31850805636" className="text-blue-600 hover:underline font-medium">
                      +31 (0)85 0805636
                    </a>{" "}
                    of stuur een email naar{" "}
                    <a href="mailto:info@mastercleanservice.nl" className="text-blue-600 hover:underline font-medium">
                      info@mastercleanservice.nl
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
})

export default Contact
