// Domain diagnostic script
// Run with: npx ts-node scripts/domain-diagnostics.ts

import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

interface DiagnosticResult {
  test: string
  status: "PASS" | "FAIL" | "WARNING" | "INFO"
  message: string
  details?: any
}

class DomainDiagnostics {
  private domain = "mastercleanservice.nl"
  private expectedIP = "76.76.21.21"
  private expectedCNAME = "cname.vercel-dns.com"
  private results: DiagnosticResult[] = []

  async runDiagnostics(): Promise<DiagnosticResult[]> {
    console.log("🔍 Starting domain diagnostics for mastercleanservice.nl...\n")

    await this.checkDNSResolution()
    await this.checkDomainAccess()
    await this.checkSSLCertificate()
    await this.checkVercelStatus()
    await this.checkDNSPropagation()
    await this.checkNameservers()

    this.printResults()
    this.printRecommendations()

    return this.results
  }

  private async checkDNSResolution(): Promise<void> {
    console.log("🌐 Checking DNS resolution...")

    try {
      // Check A record
      const { stdout: aRecord } = await execAsync(`nslookup ${this.domain}`)
      if (aRecord.includes(this.expectedIP)) {
        this.addResult("DNS A Record", "PASS", `${this.domain} resolves to ${this.expectedIP}`)
      } else {
        this.addResult("DNS A Record", "FAIL", `${this.domain} does not resolve to ${this.expectedIP}`, aRecord)
      }
    } catch (error) {
      this.addResult("DNS A Record", "FAIL", `Failed to resolve ${this.domain}: ${error}`)
    }

    try {
      // Check CNAME record
      const { stdout: cnameRecord } = await execAsync(`nslookup www.${this.domain}`)
      if (cnameRecord.includes(this.expectedCNAME) || cnameRecord.includes("vercel")) {
        this.addResult("DNS CNAME Record", "PASS", `www.${this.domain} points to Vercel`)
      } else {
        this.addResult("DNS CNAME Record", "FAIL", `www.${this.domain} does not point to Vercel`, cnameRecord)
      }
    } catch (error) {
      this.addResult("DNS CNAME Record", "FAIL", `Failed to resolve www.${this.domain}: ${error}`)
    }
  }

  private async checkDomainAccess(): Promise<void> {
    console.log("🌍 Checking domain accessibility...")

    const urls = [`https://${this.domain}`, `https://www.${this.domain}`, `http://${this.domain}`]

    for (const url of urls) {
      try {
        const response = await fetch(url, {
          method: "HEAD",
          redirect: "manual",
        })

        if (response.ok) {
          this.addResult("Domain Access", "PASS", `${url} returns ${response.status}`)
        } else if (response.status >= 300 && response.status < 400) {
          this.addResult("Domain Access", "INFO", `${url} redirects (${response.status})`)
        } else if (response.status === 404) {
          this.addResult("Domain Access", "FAIL", `${url} returns 404 NOT FOUND`)
        } else {
          this.addResult("Domain Access", "WARNING", `${url} returns ${response.status}`)
        }
      } catch (error) {
        this.addResult("Domain Access", "FAIL", `${url} failed to load: ${error}`)
      }
    }
  }

  private async checkSSLCertificate(): Promise<void> {
    console.log("🔒 Checking SSL certificate...")

    try {
      const response = await fetch(`https://${this.domain}`, { method: "HEAD" })
      const url = new URL(response.url)

      if (url.protocol === "https:") {
        this.addResult("SSL Certificate", "PASS", "HTTPS is working")
      } else {
        this.addResult("SSL Certificate", "FAIL", "HTTPS not working")
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("certificate")) {
        this.addResult("SSL Certificate", "FAIL", `SSL certificate error: ${error.message}`)
      } else {
        this.addResult("SSL Certificate", "FAIL", `SSL check failed: ${error}`)
      }
    }
  }

  private async checkVercelStatus(): Promise<void> {
    console.log("⚡ Checking Vercel deployment status...")

    try {
      // Try to access the site and check for Vercel-specific headers
      const response = await fetch(`https://${this.domain}`, { method: "HEAD" })
      const server = response.headers.get("server")
      const vercelHeaders = response.headers.get("x-vercel-cache") || response.headers.get("x-vercel-id")

      if (server?.includes("Vercel") || vercelHeaders) {
        this.addResult("Vercel Status", "PASS", "Site is served by Vercel")
      } else {
        this.addResult("Vercel Status", "WARNING", "Cannot confirm Vercel deployment")
      }
    } catch (error) {
      this.addResult("Vercel Status", "FAIL", `Cannot check Vercel status: ${error}`)
    }
  }

  private async checkDNSPropagation(): Promise<void> {
    console.log("🌏 Checking DNS propagation...")

    const dnsServers = [
      { name: "Google", server: "8.8.8.8" },
      { name: "Cloudflare", server: "1.1.1.1" },
      { name: "OpenDNS", server: "208.67.222.222" },
    ]

    for (const dns of dnsServers) {
      try {
        const { stdout } = await execAsync(`nslookup ${this.domain} ${dns.server}`)
        if (stdout.includes(this.expectedIP)) {
          this.addResult("DNS Propagation", "PASS", `${dns.name} DNS resolves correctly`)
        } else {
          this.addResult("DNS Propagation", "WARNING", `${dns.name} DNS not yet propagated`)
        }
      } catch (error) {
        this.addResult("DNS Propagation", "WARNING", `Cannot check ${dns.name} DNS: ${error}`)
      }
    }
  }

  private async checkNameservers(): Promise<void> {
    console.log("🏷️ Checking nameservers...")

    try {
      const { stdout } = await execAsync(`nslookup -type=NS ${this.domain}`)
      this.addResult("Nameservers", "INFO", "Current nameservers", stdout.trim())
    } catch (error) {
      this.addResult("Nameservers", "WARNING", `Cannot check nameservers: ${error}`)
    }
  }

  private addResult(test: string, status: "PASS" | "FAIL" | "WARNING" | "INFO", message: string, details?: any): void {
    this.results.push({ test, status, message, details })

    const emoji = {
      PASS: "✅",
      FAIL: "❌",
      WARNING: "⚠️",
      INFO: "ℹ️",
    }[status]

    console.log(`${emoji} ${test}: ${message}`)
  }

  private printResults(): void {
    console.log("\n📊 Diagnostic Results Summary:")
    console.log("================================")

    const passed = this.results.filter((r) => r.status === "PASS").length
    const failed = this.results.filter((r) => r.status === "FAIL").length
    const warnings = this.results.filter((r) => r.status === "WARNING").length
    const info = this.results.filter((r) => r.status === "INFO").length

    console.log(`✅ Passed: ${passed}`)
    console.log(`❌ Failed: ${failed}`)
    console.log(`⚠️  Warnings: ${warnings}`)
    console.log(`ℹ️  Info: ${info}`)

    if (failed === 0 && warnings <= 1) {
      console.log("\n🎉 Domain configuration looks good!")
    } else if (failed === 0) {
      console.log("\n✨ Domain mostly working, minor issues detected")
    } else {
      console.log("\n🔧 Critical issues found that need attention")
    }
  }

  private printRecommendations(): void {
    const failures = this.results.filter((r) => r.status === "FAIL")
    const warnings = this.results.filter((r) => r.status === "WARNING")

    if (failures.length > 0) {
      console.log("\n🚨 Critical Issues to Fix:")
      failures.forEach((f) => {
        console.log(`   • ${f.test}: ${f.message}`)
      })
    }

    if (warnings.length > 0) {
      console.log("\n⚠️  Warnings to Address:")
      warnings.forEach((w) => {
        console.log(`   • ${w.test}: ${w.message}`)
      })
    }

    console.log("\n🔧 Recommended Actions:")

    const dnsFailures = failures.filter((f) => f.test.includes("DNS"))
    const accessFailures = failures.filter((f) => f.test.includes("Access"))
    const sslFailures = failures.filter((f) => f.test.includes("SSL"))

    if (dnsFailures.length > 0) {
      console.log("   1. Fix DNS configuration in Hostinger:")
      console.log("      - Add A record: @ → 76.76.21.21")
      console.log("      - Add CNAME record: www → cname.vercel-dns.com")
    }

    if (accessFailures.length > 0) {
      console.log("   2. Check Vercel domain configuration:")
      console.log("      - Add domain in Vercel dashboard")
      console.log("      - Verify domain ownership")
      console.log("      - Check deployment status")
    }

    if (sslFailures.length > 0) {
      console.log("   3. SSL certificate issues:")
      console.log("      - Wait for automatic SSL provisioning")
      console.log("      - Check domain verification in Vercel")
    }

    console.log("\n⏱️  Expected Resolution Time:")
    console.log("   • DNS changes: 15-30 minutes")
    console.log("   • Global propagation: 2-48 hours")
    console.log("   • SSL certificate: 1-24 hours")
  }
}

// Run diagnostics if this file is executed directly
if (require.main === module) {
  const diagnostics = new DomainDiagnostics()
  diagnostics.runDiagnostics().catch(console.error)
}

export { DomainDiagnostics }
