# 🌐 Custom Domain Setup Guide - Hostinger to Vercel

## Overview
This guide will help you connect your Hostinger domain to your Vercel-hosted MasterClean website.

## Prerequisites
- ✅ Website deployed on Vercel
- ✅ Domain registered with Hostinger
- ✅ Access to Hostinger control panel
- ✅ Access to Vercel dashboard

---

## Step 1: Deploy Your Website to Vercel

### 1.1 Connect GitHub Repository to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your MasterClean repository
5. Configure build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Add environment variables:
   - `RESEND_API_KEY`: Your Resend API key
7. Click "Deploy"

### 1.2 Note Your Vercel Domain
After deployment, Vercel will provide you with a domain like:
- `masterclean-website-abc123.vercel.app`

---

## Step 2: Configure Domain in Vercel

### 2.1 Add Custom Domain
1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Click on "Domains" in the sidebar
4. Click "Add Domain"
5. Enter your domain (e.g., `mastercleanservice.nl`)
6. Click "Add"

### 2.2 Get DNS Configuration Values
Vercel will show you the DNS records you need to configure. You'll see something like:

**For Root Domain (mastercleanservice.nl):**
- Type: A
- Name: @
- Value: 76.76.21.21

**For WWW Subdomain (www.mastercleanservice.nl):**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

---

## Step 3: Configure DNS in Hostinger

### 3.1 Access Hostinger Control Panel
1. Log in to [hostinger.com](https://hostinger.com)
2. Go to "Hosting" → "Manage"
3. Find your domain and click "Manage"
4. Look for "DNS Zone" or "DNS Records"

### 3.2 Update DNS Records

#### Delete Existing Records (if any)
1. Look for existing A records pointing to @
2. Look for existing CNAME records for www
3. Delete these old records

#### Add New A Record for Root Domain
1. Click "Add Record" or "+"
2. Select "A" record type
3. Fill in:
   - **Type**: A
   - **Name**: @ (or leave empty)
   - **Points to**: 76.76.21.21
   - **TTL**: 3600 (or default)
4. Save the record

#### Add New CNAME Record for WWW
1. Click "Add Record" or "+"
2. Select "CNAME" record type
3. Fill in:
   - **Type**: CNAME
   - **Name**: www
   - **Points to**: cname.vercel-dns.com
   - **TTL**: 3600 (or default)
4. Save the record

### 3.3 Optional: Add Additional Subdomains
If you want subdomains like `info.mastercleanservice.nl`:
1. Add CNAME record:
   - **Type**: CNAME
   - **Name**: info
   - **Points to**: cname.vercel-dns.com

---

## Step 4: Verify Domain Configuration

### 4.1 Check DNS Propagation
DNS changes can take 24-48 hours to propagate. You can check status using:

**Online Tools:**
- [whatsmydns.net](https://whatsmydns.net)
- [dnschecker.org](https://dnschecker.org)

**Command Line:**
\`\`\`bash
# Check A record
nslookup mastercleanservice.nl

# Check CNAME record
nslookup www.mastercleanservice.nl
\`\`\`

### 4.2 Verify in Vercel
1. Go back to Vercel dashboard
2. Check "Domains" section
3. You should see green checkmarks next to your domains
4. If there are errors, Vercel will show specific instructions

---

## Step 5: SSL Certificate Setup

### 5.1 Automatic SSL (Recommended)
Vercel automatically provides SSL certificates for custom domains:
- ✅ Free SSL certificate
- ✅ Automatic renewal
- ✅ HTTPS redirect

### 5.2 Verify SSL
1. Visit your domain: `https://mastercleanservice.nl`
2. Check for the lock icon in browser
3. Certificate should be issued by "Vercel"

---

## Step 6: Update Website Configuration

### 6.1 Update Environment Variables
Add your custom domain to Vercel environment variables:
\`\`\`env
NEXT_PUBLIC_SITE_URL=https://mastercleanservice.nl
\`\`\`

### 6.2 Update Metadata (Optional)
Update your website's metadata to reflect the new domain:

\`\`\`typescript
// In app/layout.tsx or relevant files
export const metadata: Metadata = {
  metadataBase: new URL('https://mastercleanservice.nl'),
  title: "MasterClean - Professionele Schoonmaakdiensten",
  // ... other metadata
}
\`\`\`

---

## Troubleshooting

### Common Issues and Solutions

#### 1. "Domain not found" Error
**Problem**: DNS records not propagated yet
**Solution**: 
- Wait 24-48 hours for DNS propagation
- Check DNS propagation tools
- Verify DNS records are correct

#### 2. "SSL Certificate Error"
**Problem**: SSL not yet issued
**Solution**:
- Wait for automatic SSL provisioning (can take up to 24 hours)
- Check domain verification in Vercel
- Ensure DNS records are correct

#### 3. "404 Not Found" on Custom Domain
**Problem**: Domain pointing to wrong location
**Solution**:
- Verify A record points to 76.76.21.21
- Check CNAME record points to cname.vercel-dns.com
- Ensure domain is added in Vercel dashboard

#### 4. "Mixed Content" Warnings
**Problem**: HTTP resources on HTTPS site
**Solution**:
- Update all internal links to use HTTPS
- Check external resources (images, scripts) use HTTPS
- Update API endpoints to use HTTPS

### DNS Record Examples

**Correct DNS Configuration:**
\`\`\`
Type    Name    Value                   TTL
A       @       76.76.21.21            3600
CNAME   www     cname.vercel-dns.com   3600
\`\`\`

**Common Mistakes:**
❌ Using old IP addresses
❌ Pointing www to the root domain IP
❌ Missing @ record for root domain
❌ Incorrect CNAME target

---

## Step 7: Final Verification Checklist

### ✅ Domain Accessibility
- [ ] `mastercleanservice.nl` loads correctly
- [ ] `www.mastercleanservice.nl` loads correctly
- [ ] Both redirect to HTTPS automatically
- [ ] SSL certificate is valid and trusted

### ✅ Website Functionality
- [ ] All pages load correctly
- [ ] Contact form works
- [ ] Email sending functions properly
- [ ] Language switching works
- [ ] Mobile responsiveness maintained

### ✅ SEO and Performance
- [ ] Meta tags include correct domain
- [ ] Sitemap updated with new domain
- [ ] Google Search Console configured
- [ ] Analytics tracking updated

---

## Additional Recommendations

### 1. Email Configuration
If you want to use email with your domain (info@mastercleanservice.nl):
1. Set up email hosting with Hostinger
2. Configure MX records in DNS
3. Update contact form to send from your domain

### 2. Subdomain Strategy
Consider these subdomains for different purposes:
- `www.mastercleanservice.nl` - Main website
- `blog.mastercleanservice.nl` - Future blog
- `app.mastercleanservice.nl` - Customer portal
- `api.mastercleanservice.nl` - API endpoints

### 3. Monitoring Setup
Set up monitoring for your domain:
- Google Search Console
- Google Analytics
- Uptime monitoring
- SSL certificate monitoring

---

## Support Contacts

### Hostinger Support
- **Website**: hostinger.com/help
- **Live Chat**: Available 24/7
- **Email**: support@hostinger.com

### Vercel Support
- **Website**: vercel.com/help
- **Documentation**: vercel.com/docs
- **Community**: github.com/vercel/vercel/discussions

---

## Timeline Expectations

| Step | Expected Time |
|------|---------------|
| DNS Record Update | 5-10 minutes |
| DNS Propagation | 2-48 hours |
| SSL Certificate | 1-24 hours |
| Full Verification | 24-48 hours |

**Note**: DNS propagation times vary by location and ISP. Some users may see changes immediately, while others may need to wait the full 48 hours.
