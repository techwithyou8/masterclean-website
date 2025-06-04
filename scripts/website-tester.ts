// Automated website testing script
// Run with: npx ts-node scripts/website-tester.ts

interface TestResult {
  test: string
  status: "PASS" | "FAIL" | "WARNING"
  message: string
  details?: any
}

class WebsiteTester {
  private domain = "https://mastercleanservice.nl"
  private results: TestResult[] = []

  async runAllTests(): Promise<TestResult[]> {
    console.log("🚀 Starting comprehensive website tests...\n")

    await this.testDomainAccess()
    await this.testSSLCertificate()
    await this.testPageLoading()
    await this.testResponsiveDesign()
    await this.testContactForm()
    await this.testPerformance()
    await this.testSEO()
    await this.testAccessibility()

    this.printResults()
    return this.results
  }

  private async testDomainAccess(): Promise<void> {
    console.log("🌐 Testing domain access...")

    const urls = [
      `${this.domain}`,
      `${this.domain}/services`,
      `${this.domain}/about`,
      `${this.domain}/contact`,
      `https://www.mastercleanservice.nl`,
    ]

    for (const url of urls) {
      try {
        const response = await fetch(url)
        if (response.ok) {
          this.addResult("Domain Access", "PASS", `${url} loads successfully`)
        } else {
          this.addResult("Domain Access", "FAIL", `${url} returned ${response.status}`)
        }
      } catch (error) {
        this.addResult("Domain Access", "FAIL", `${url} failed to load: ${error}`)
      }
    }
  }

  private async testSSLCertificate(): Promise<void> {
    console.log("🔒 Testing SSL certificate...")

    try {
      const response = await fetch(this.domain)
      const url = new URL(response.url)

      if (url.protocol === "https:") {
        this.addResult("SSL Certificate", "PASS", "HTTPS is properly configured")
      } else {
        this.addResult("SSL Certificate", "FAIL", "Site not using HTTPS")
      }
    } catch (error) {
      this.addResult("SSL Certificate", "FAIL", `SSL test failed: ${error}`)
    }
  }

  private async testPageLoading(): Promise<void> {
    console.log("⚡ Testing page loading performance...")

    const pages = ["/", "/services", "/about", "/contact"]

    for (const page of pages) {
      const startTime = Date.now()
      try {
        const response = await fetch(`${this.domain}${page}`)
        const loadTime = Date.now() - startTime

        if (response.ok) {
          if (loadTime < 3000) {
            this.addResult("Page Loading", "PASS", `${page} loaded in ${loadTime}ms`)
          } else {
            this.addResult("Page Loading", "WARNING", `${page} loaded slowly: ${loadTime}ms`)
          }
        } else {
          this.addResult("Page Loading", "FAIL", `${page} returned ${response.status}`)
        }
      } catch (error) {
        this.addResult("Page Loading", "FAIL", `${page} failed to load: ${error}`)
      }
    }
  }

  private async testResponsiveDesign(): Promise<void> {
    console.log("📱 Testing responsive design...")

    // This would require a headless browser like Puppeteer for full testing
    // For now, we'll check if the viewport meta tag is present
    try {
      const response = await fetch(this.domain)
      const html = await response.text()

      if (html.includes("viewport")) {
        this.addResult("Responsive Design", "PASS", "Viewport meta tag found")
      } else {
        this.addResult("Responsive Design", "WARNING", "Viewport meta tag not found")
      }

      // Check for responsive CSS classes
      if (
        html.includes("responsive") ||
        html.includes("mobile") ||
        html.includes("sm:") ||
        html.includes("md:") ||
        html.includes("lg:")
      ) {
        this.addResult("Responsive Design", "PASS", "Responsive CSS classes detected")
      } else {
        this.addResult("Responsive Design", "WARNING", "No responsive CSS classes detected")
      }
    } catch (error) {
      this.addResult("Responsive Design", "FAIL", `Responsive test failed: ${error}`)
    }
  }

  private async testContactForm(): Promise<void> {
    console.log("📧 Testing contact form...")

    try {
      const response = await fetch(`${this.domain}/contact`)
      const html = await response.text()

      // Check for form elements
      if (html.includes("<form") && html.includes("name=") && html.includes("email=")) {
        this.addResult("Contact Form", "PASS", "Contact form elements found")
      } else {
        this.addResult("Contact Form", "FAIL", "Contact form not found or incomplete")
      }

      // Check for phone links
      if (html.includes("tel:+31850805636")) {
        this.addResult("Contact Form", "PASS", "Phone link found")
      } else {
        this.addResult("Contact Form", "WARNING", "Phone link not found")
      }

      // Check for email links
      if (html.includes("mailto:info@mastercleanservice.nl")) {
        this.addResult("Contact Form", "PASS", "Email link found")
      } else {
        this.addResult("Contact Form", "WARNING", "Email link not found")
      }
    } catch (error) {
      this.addResult("Contact Form", "FAIL", `Contact form test failed: ${error}`)
    }
  }

  private async testPerformance(): Promise<void> {
    console.log("🚀 Testing performance...")

    const startTime = Date.now()
    try {
      const response = await fetch(this.domain)
      const loadTime = Date.now() - startTime
      const contentLength = response.headers.get("content-length")

      if (loadTime < 2000) {
        this.addResult("Performance", "PASS", `Fast load time: ${loadTime}ms`)
      } else if (loadTime < 5000) {
        this.addResult("Performance", "WARNING", `Moderate load time: ${loadTime}ms`)
      } else {
        this.addResult("Performance", "FAIL", `Slow load time: ${loadTime}ms`)
      }

      if (contentLength) {
        const sizeKB = Number.parseInt(contentLength) / 1024
        if (sizeKB < 500) {
          this.addResult("Performance", "PASS", `Good page size: ${sizeKB.toFixed(1)}KB`)
        } else {
          this.addResult("Performance", "WARNING", `Large page size: ${sizeKB.toFixed(1)}KB`)
        }
      }
    } catch (error) {
      this.addResult("Performance", "FAIL", `Performance test failed: ${error}`)
    }
  }

  private async testSEO(): Promise<void> {
    console.log("🔍 Testing SEO elements...")

    try {
      const response = await fetch(this.domain)
      const html = await response.text()

      // Check for title tag
      if (html.includes("<title>") && html.includes("MasterClean")) {
        this.addResult("SEO", "PASS", "Title tag found with company name")
      } else {
        this.addResult("SEO", "FAIL", "Title tag missing or incomplete")
      }

      // Check for meta description
      if (html.includes('meta name="description"')) {
        this.addResult("SEO", "PASS", "Meta description found")
      } else {
        this.addResult("SEO", "WARNING", "Meta description not found")
      }

      // Check for heading structure
      if (html.includes("<h1>")) {
        this.addResult("SEO", "PASS", "H1 heading found")
      } else {
        this.addResult("SEO", "WARNING", "H1 heading not found")
      }

      // Check for alt text on images
      const imgMatches = html.match(/<img[^>]*>/g) || []
      const imgsWithAlt = imgMatches.filter((img) => img.includes("alt=")).length
      const totalImgs = imgMatches.length

      if (totalImgs > 0) {
        const altPercentage = (imgsWithAlt / totalImgs) * 100
        if (altPercentage >= 90) {
          this.addResult("SEO", "PASS", `${altPercentage.toFixed(0)}% of images have alt text`)
        } else {
          this.addResult("SEO", "WARNING", `Only ${altPercentage.toFixed(0)}% of images have alt text`)
        }
      }
    } catch (error) {
      this.addResult("SEO", "FAIL", `SEO test failed: ${error}`)
    }
  }

  private async testAccessibility(): Promise<void> {
    console.log("♿ Testing accessibility...")

    try {
      const response = await fetch(this.domain)
      const html = await response.text()

      // Check for lang attribute
      if (html.includes("lang=")) {
        this.addResult("Accessibility", "PASS", "Language attribute found")
      } else {
        this.addResult("Accessibility", "WARNING", "Language attribute not found")
      }

      // Check for form labels
      const formInputs = (html.match(/<input[^>]*>/g) || []).length
      const formLabels = (html.match(/<label[^>]*>/g) || []).length

      if (formInputs > 0 && formLabels >= formInputs) {
        this.addResult("Accessibility", "PASS", "Form inputs have labels")
      } else if (formInputs > 0) {
        this.addResult("Accessibility", "WARNING", "Some form inputs may be missing labels")
      }

      // Check for ARIA attributes
      if (html.includes("aria-") || html.includes("role=")) {
        this.addResult("Accessibility", "PASS", "ARIA attributes found")
      } else {
        this.addResult("Accessibility", "WARNING", "No ARIA attributes found")
      }
    } catch (error) {
      this.addResult("Accessibility", "FAIL", `Accessibility test failed: ${error}`)
    }
  }

  private addResult(test: string, status: "PASS" | "FAIL" | "WARNING", message: string, details?: any): void {
    this.results.push({ test, status, message, details })

    const emoji = status === "PASS" ? "✅" : status === "FAIL" ? "❌" : "⚠️"
    console.log(`${emoji} ${test}: ${message}`)
  }

  private printResults(): void {
    console.log("\n📊 Test Results Summary:")
    console.log("========================")

    const passed = this.results.filter((r) => r.status === "PASS").length
    const failed = this.results.filter((r) => r.status === "FAIL").length
    const warnings = this.results.filter((r) => r.status === "WARNING").length
    const total = this.results.length

    console.log(`✅ Passed: ${passed}/${total}`)
    console.log(`❌ Failed: ${failed}/${total}`)
    console.log(`⚠️  Warnings: ${warnings}/${total}`)

    const successRate = (passed / total) * 100
    console.log(`\n🎯 Success Rate: ${successRate.toFixed(1)}%`)

    if (failed === 0 && warnings <= 2) {
      console.log("\n🎉 Website is ready for production!")
    } else if (failed === 0) {
      console.log("\n✨ Website is functional with minor issues to address")
    } else {
      console.log("\n🔧 Website has critical issues that need to be fixed")
    }

    // Print failed tests
    if (failed > 0) {
      console.log("\n❌ Critical Issues:")
      this.results.filter((r) => r.status === "FAIL").forEach((r) => console.log(`   • ${r.test}: ${r.message}`))
    }

    // Print warnings
    if (warnings > 0) {
      console.log("\n⚠️  Warnings:")
      this.results.filter((r) => r.status === "WARNING").forEach((r) => console.log(`   • ${r.test}: ${r.message}`))
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new WebsiteTester()
  tester.runAllTests().catch(console.error)
}

export { WebsiteTester, type TestResult }
