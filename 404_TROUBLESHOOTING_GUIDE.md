# 🚨 404 Error Troubleshooting Guide - mastercleanservice.nl

## Error Analysis

**Error Type**: 404 NOT_FOUND
**Domain**: mastercleanservice.nl
**Status**: Domain not resolving to Vercel deployment

## Diagnostic Steps

### Step 1: Verify Current DNS Configuration

#### Check DNS Records
\`\`\`bash
# Check A record
nslookup mastercleanservice.nl
dig mastercleanservice.nl A

# Check CNAME record
nslookup www.mastercleanservice.nl
dig www.mastercleanservice.nl CNAME

# Check nameservers
nslookup -type=NS mastercleanservice.nl
\`\`\`

#### Expected Results:
\`\`\`
mastercleanservice.nl A record: 76.76.21.21
www.mastercleanservice.nl CNAME: cname.vercel-dns.com
\`\`\`

### Step 2: Verify Vercel Deployment Status

#### Check Deployment
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your MasterClean project
3. Check deployment status
4. Verify domain configuration

#### Expected Status:
- ✅ Deployment: Success
- ✅ Domain: mastercleanservice.nl (Verified)
- ✅ SSL: Active

### Step 3: Test Domain Resolution

#### Online Tools:
- [DNS Checker](https://dnschecker.org/)
- [What's My DNS](https://whatsmydns.net/)
- [DNS Propagation Checker](https://dnspropagation.net/)

#### Command Line Tests:
\`\`\`bash
# Test direct IP access
curl -I 76.76.21.21

# Test domain resolution
curl -I https://mastercleanservice.nl

# Test with host header
curl -H "Host: mastercleanservice.nl" https://76.76.21.21
\`\`\`

---

## Common Causes & Solutions

### Cause 1: DNS Records Not Configured

**Symptoms:**
- Domain doesn't resolve
- DNS lookup fails
- "This site can't be reached" error

**Solution:**
1. Log into Hostinger control panel
2. Go to DNS Zone management
3. Add/update these records:

\`\`\`
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
\`\`\`

### Cause 2: Domain Not Added to Vercel

**Symptoms:**
- DNS resolves but shows Vercel 404
- "The deployment could not be found" error

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Click "Add Domain"
3. Enter: `mastercleanservice.nl`
4. Follow verification steps
5. Add both root domain and www subdomain

### Cause 3: DNS Propagation Delay

**Symptoms:**
- Works in some locations, not others
- Intermittent access issues
- Recent DNS changes

**Solution:**
- Wait 24-48 hours for full propagation
- Clear DNS cache locally
- Use different DNS servers for testing

### Cause 4: Incorrect Nameservers

**Symptoms:**
- DNS records exist but don't resolve
- Domain points to old hosting

**Solution:**
1. Check current nameservers:
\`\`\`bash
nslookup -type=NS mastercleanservice.nl
\`\`\`
2. Ensure they're Hostinger's nameservers
3. If using external DNS, update there instead

### Cause 5: Deployment Issues

**Symptoms:**
- Domain resolves but shows error page
- Build failures in Vercel

**Solution:**
1. Check Vercel deployment logs
2. Redeploy if necessary
3. Verify build settings

---

## Step-by-Step Resolution Process

### Phase 1: Immediate Diagnostics

#### 1.1 Check DNS Status
\`\`\`bash
# Run these commands and note results
nslookup mastercleanservice.nl
nslookup www.mastercleanservice.nl
ping mastercleanservice.nl
\`\`\`

#### 1.2 Check Vercel Status
1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Locate MasterClean project
3. Check deployment status
4. Review domain settings

#### 1.3 Test Alternative Access
- Try: `https://your-project-name.vercel.app`
- If this works, issue is domain-related
- If this fails, issue is deployment-related

### Phase 2: DNS Configuration Fix

#### 2.1 Access Hostinger Control Panel
1. Log into [Hostinger](https://hostinger.com)
2. Go to Hosting → Manage
3. Find your domain
4. Click "Manage" → "DNS Zone"

#### 2.2 Update DNS Records
**Delete existing conflicting records first:**
- Remove any A records pointing to old IPs
- Remove any CNAME records for @ or www

**Add new records:**
\`\`\`
Record 1:
Type: A
Name: @ (or leave empty)
Points to: 76.76.21.21
TTL: 3600

Record 2:
Type: CNAME
Name: www
Points to: cname.vercel-dns.com
TTL: 3600
\`\`\`

#### 2.3 Save and Wait
- Save DNS changes
- Wait 15-30 minutes for initial propagation
- Test domain resolution

### Phase 3: Vercel Configuration Fix

#### 3.1 Add Domain to Vercel
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Domains
4. Click "Add Domain"
5. Enter: `mastercleanservice.nl`
6. Click "Add"

#### 3.2 Verify Domain
- Vercel will show DNS instructions
- Confirm they match your Hostinger settings
- Wait for verification checkmark

#### 3.3 Add WWW Subdomain
1. Click "Add Domain" again
2. Enter: `www.mastercleanservice.nl`
3. Verify it points to the same deployment

### Phase 4: Verification and Testing

#### 4.1 DNS Propagation Check
Use online tools:
- [whatsmydns.net](https://whatsmydns.net/?d=mastercleanservice.nl&t=A)
- [dnschecker.org](https://dnschecker.org/all-dns-records-of-domain.php?host=mastercleanservice.nl)

#### 4.2 Domain Access Test
\`\`\`bash
# Test both variants
curl -I https://mastercleanservice.nl
curl -I https://www.mastercleanservice.nl

# Should return 200 OK or 301/302 redirect
\`\`\`

#### 4.3 SSL Certificate Check
- Visit `https://mastercleanservice.nl`
- Verify SSL certificate is valid
- Check for mixed content warnings

---

## Emergency Fixes

### Quick Fix 1: Force DNS Refresh
\`\`\`bash
# Clear local DNS cache
# Windows:
ipconfig /flushdns

# Mac:
sudo dscacheutil -flushcache

# Linux:
sudo systemctl restart systemd-resolved
\`\`\`

### Quick Fix 2: Use Alternative DNS
Temporarily use public DNS servers:
- Google DNS: 8.8.8.8, 8.8.4.4
- Cloudflare DNS: 1.1.1.1, 1.0.0.1

### Quick Fix 3: Direct IP Access
Test if deployment works:
\`\`\`bash
curl -H "Host: mastercleanservice.nl" https://76.76.21.21
\`\`\`

---

## Verification Checklist

After implementing fixes, verify:

### DNS Resolution
- [ ] `nslookup mastercleanservice.nl` returns 76.76.21.21
- [ ] `nslookup www.mastercleanservice.nl` returns cname.vercel-dns.com
- [ ] DNS propagation shows green globally

### Domain Access
- [ ] `https://mastercleanservice.nl` loads website
- [ ] `https://www.mastercleanservice.nl` loads website
- [ ] `http://mastercleanservice.nl` redirects to HTTPS
- [ ] SSL certificate is valid

### Vercel Configuration
- [ ] Domain shows as "Verified" in Vercel dashboard
- [ ] SSL certificate is "Active"
- [ ] Latest deployment is live

### Website Functionality
- [ ] All pages load correctly
- [ ] Contact form works
- [ ] Images and assets load
- [ ] No console errors

---

## Advanced Troubleshooting

### If DNS is Correct but Still 404

#### Check Vercel Deployment
1. Go to Vercel Dashboard → Deployments
2. Check if latest deployment succeeded
3. Look for build errors
4. Verify deployment is assigned to domain

#### Check Build Configuration
Verify these files are correct:
- `next.config.mjs`
- `vercel.json`
- `package.json` scripts

#### Force Redeploy
1. Go to Vercel Dashboard
2. Find latest deployment
3. Click "..." → "Redeploy"
4. Wait for completion

### If Vercel Shows Domain Issues

#### Re-add Domain
1. Remove domain from Vercel
2. Wait 5 minutes
3. Re-add domain
4. Follow verification steps

#### Check Domain Ownership
- Ensure domain is not locked
- Verify you have admin access
- Check domain expiration date

---

## Contact Support

### Hostinger Support
- **Live Chat**: Available 24/7
- **Email**: support@hostinger.com
- **Phone**: Check your account for local number

### Vercel Support
- **Help Center**: [vercel.com/help](https://vercel.com/help)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Documentation**: [vercel.com/docs](https://vercel.com/docs)

---

## Prevention

### Regular Monitoring
- Set up uptime monitoring
- Monitor SSL certificate expiry
- Check DNS propagation after changes

### Best Practices
- Always test in staging first
- Keep DNS TTL reasonable (3600s)
- Document all configuration changes
- Maintain backup access methods

---

## Timeline Expectations

| Action | Expected Time |
|--------|---------------|
| DNS record update | 5-10 minutes |
| Initial propagation | 15-30 minutes |
| Global propagation | 2-48 hours |
| SSL certificate | 1-24 hours |
| Vercel verification | 5-15 minutes |

**Note**: Most issues resolve within 30 minutes if configuration is correct.
