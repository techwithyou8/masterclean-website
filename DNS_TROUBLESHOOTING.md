# 🔧 DNS Troubleshooting Guide

## Common DNS Issues and Solutions

### Issue 1: "Domain not found" after 48 hours
**Symptoms**: Domain still not resolving after 2 days
**Causes**: 
- Incorrect DNS records
- DNS cache issues
- Registrar lock

**Solutions**:
1. **Verify DNS Records**:
   \`\`\`bash
   # Check what DNS records are actually set
   dig mastercleanservice.nl A
   dig www.mastercleanservice.nl CNAME
   \`\`\`

2. **Clear DNS Cache**:
   \`\`\`bash
   # On Mac/Linux
   sudo dscacheutil -flushcache
   
   # On Windows
   ipconfig /flushdns
   \`\`\`

3. **Check Registrar Settings**:
   - Ensure domain is not locked
   - Verify nameservers are correct
   - Check domain expiration date

### Issue 2: Website loads but shows Hostinger parking page
**Symptoms**: Domain resolves but shows wrong content
**Cause**: DNS records pointing to Hostinger servers instead of Vercel

**Solution**:
1. Double-check A record value: Must be `76.76.21.21`
2. Ensure you're editing the correct domain
3. Wait for DNS propagation (up to 48 hours)

### Issue 3: WWW works but root domain doesn't (or vice versa)
**Symptoms**: Only one version of domain works
**Cause**: Missing or incorrect DNS records

**Solution**:
Ensure both records are present:
\`\`\`
A record: @ → 76.76.21.21
CNAME record: www → cname.vercel-dns.com
\`\`\`

### Issue 4: SSL Certificate errors
**Symptoms**: Browser shows "Not Secure" or certificate warnings
**Causes**:
- SSL not yet provisioned
- Mixed content (HTTP resources on HTTPS site)
- Incorrect domain configuration

**Solutions**:
1. **Wait for SSL Provisioning**: Can take up to 24 hours
2. **Check Vercel Dashboard**: Look for SSL status
3. **Force SSL Renewal**: Remove and re-add domain in Vercel
4. **Check Mixed Content**: Ensure all resources use HTTPS

### Issue 5: Slow DNS propagation
**Symptoms**: Some locations can access site, others cannot
**Cause**: Normal DNS propagation delay

**Solutions**:
1. **Be Patient**: Can take up to 48 hours globally
2. **Use Different DNS**: Try 8.8.8.8 or 1.1.1.1 temporarily
3. **Check Multiple Locations**: Use online DNS checkers

## DNS Verification Commands

### Check A Record
\`\`\`bash
# Should return 76.76.21.21
nslookup mastercleanservice.nl
dig mastercleanservice.nl A
\`\`\`

### Check CNAME Record
\`\`\`bash
# Should return cname.vercel-dns.com
nslookup www.mastercleanservice.nl
dig www.mastercleanservice.nl CNAME
\`\`\`

### Check from Different DNS Servers
\`\`\`bash
# Google DNS
nslookup mastercleanservice.nl 8.8.8.8

# Cloudflare DNS
nslookup mastercleanservice.nl 1.1.1.1

# Your ISP DNS (default)
nslookup mastercleanservice.nl
\`\`\`

## Online Tools for DNS Checking

1. **DNS Propagation Checker**: [whatsmydns.net](https://whatsmydns.net)
2. **DNS Lookup Tool**: [dnschecker.org](https://dnschecker.org)
3. **SSL Checker**: [ssllabs.com/ssltest](https://ssllabs.com/ssltest)
4. **Website Speed Test**: [gtmetrix.com](https://gtmetrix.com)

## When to Contact Support

### Contact Hostinger Support If:
- DNS records won't save
- Domain shows as locked
- Nameserver issues
- Billing/domain registration problems

### Contact Vercel Support If:
- SSL certificate won't provision after 24 hours
- Domain verification fails in Vercel
- Deployment issues
- Custom domain configuration problems

## Emergency Workaround

If your custom domain isn't working, you can always access your site via the Vercel domain:
- `https://masterclean-website-abc123.vercel.app`

This ensures your website remains accessible while DNS issues are resolved.
