# 🚨 Emergency Recovery Plan - 404 Error Resolution

## Immediate Actions (Next 15 minutes)

### 1. Quick Diagnosis
Run the diagnostic script:
\`\`\`bash
npx ts-node scripts/domain-diagnostics.ts
\`\`\`

Or use the quick fix script:
\`\`\`bash
bash scripts/quick-domain-fix.sh
\`\`\`

### 2. Check Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your MasterClean project
3. Check deployment status
4. Verify domain configuration

### 3. Verify DNS in Hostinger
1. Log into [Hostinger](https://hostinger.com)
2. Go to Hosting → Manage → DNS Zone
3. Verify these records exist:

\`\`\`
A Record:
Name: @
Value: 76.76.21.21

CNAME Record:
Name: www
Value: cname.vercel-dns.com
\`\`\`

## Most Likely Causes & Quick Fixes

### Scenario 1: Domain Not Added to Vercel (Most Common)
**Symptoms**: DNS resolves but shows Vercel 404 page

**Quick Fix**:
1. Vercel Dashboard → Project → Settings → Domains
2. Add `mastercleanservice.nl`
3. Add `www.mastercleanservice.nl`
4. Wait for verification

### Scenario 2: DNS Records Missing
**Symptoms**: "This site can't be reached" error

**Quick Fix**:
1. Hostinger → DNS Zone
2. Delete any conflicting records
3. Add A record: @ → 76.76.21.21
4. Add CNAME: www → cname.vercel-dns.com
5. Wait 15-30 minutes

### Scenario 3: Deployment Failed
**Symptoms**: Vercel shows build errors

**Quick Fix**:
1. Vercel Dashboard → Deployments
2. Check latest deployment status
3. If failed, click "Redeploy"
4. Check build logs for errors

## Step-by-Step Recovery Process

### Phase 1: Immediate Assessment (5 minutes)

1. **Test Current Status**:
   \`\`\`bash
   curl -I https://mastercleanservice.nl
   nslookup mastercleanservice.nl
   \`\`\`

2. **Check Alternative Access**:
   - Try: `https://your-project.vercel.app`
   - If this works → Domain configuration issue
   - If this fails → Deployment issue

### Phase 2: DNS Configuration (10 minutes)

1. **Access Hostinger DNS**:
   - Login to Hostinger
   - Navigate to DNS Zone
   - Screenshot current settings

2. **Update DNS Records**:
   \`\`\`
   DELETE: Any existing A records for @
   DELETE: Any existing CNAME records for www
   
   ADD: A record @ → 76.76.21.21
   ADD: CNAME www → cname.vercel-dns.com
   \`\`\`

3. **Save and Document**:
   - Save changes
   - Note timestamp
   - Take screenshot of new settings

### Phase 3: Vercel Configuration (10 minutes)

1. **Add Domain to Vercel**:
   - Go to project settings
   - Add `mastercleanservice.nl`
   - Add `www.mastercleanservice.nl`

2. **Verify Configuration**:
   - Check domain status shows "Verified"
   - Ensure SSL shows "Active"
   - Confirm latest deployment is assigned

### Phase 4: Verification (15 minutes)

1. **Wait for Propagation**:
   - Wait 15 minutes minimum
   - Clear browser cache
   - Test from different device/network

2. **Test Access**:
   \`\`\`bash
   curl -I https://mastercleanservice.nl
   curl -I https://www.mastercleanservice.nl
   \`\`\`

3. **Verify Functionality**:
   - Test homepage loads
   - Test contact form
   - Check all pages work

## Fallback Options

### Option 1: Use Vercel Domain Temporarily
If custom domain fails, use:
- `https://masterclean-website-[hash].vercel.app`
- Update any marketing materials temporarily
- Continue troubleshooting custom domain

### Option 2: Alternative DNS Provider
If Hostinger DNS has issues:
- Consider Cloudflare DNS
- Update nameservers if necessary
- Reconfigure DNS records

### Option 3: Different Hosting Provider
Last resort if Vercel has issues:
- Export project
- Deploy to Netlify or other provider
- Update DNS to point to new provider

## Monitoring and Prevention

### Set Up Monitoring
1. **Uptime Monitoring**:
   - Use UptimeRobot or similar
   - Monitor both domain variants
   - Set up email alerts

2. **DNS Monitoring**:
   - Monitor DNS record changes
   - Set up alerts for propagation issues

### Documentation
1. **Record All Changes**:
   - Document DNS modifications
   - Note deployment timestamps
   - Keep screenshots of configurations

2. **Create Runbook**:
   - Document working configuration
   - Create step-by-step recovery guide
   - Share with team members

## Contact Information

### Emergency Contacts
- **Hostinger Support**: Live chat 24/7
- **Vercel Support**: https://vercel.com/help
- **DNS Issues**: Use public DNS (8.8.8.8) for testing

### Escalation Path
1. Try self-service fixes (30 minutes)
2. Contact Hostinger support (DNS issues)
3. Contact Vercel support (deployment issues)
4. Consider alternative solutions

## Success Criteria

The issue is resolved when:
- [ ] `https://mastercleanservice.nl` loads correctly
- [ ] `https://www.mastercleanservice.nl` loads correctly
- [ ] SSL certificate is valid
- [ ] All website functionality works
- [ ] DNS propagation is complete globally
- [ ] No console errors in browser

## Post-Recovery Actions

1. **Document the Issue**:
   - What caused the problem
   - What fixed it
   - How to prevent it

2. **Update Monitoring**:
   - Ensure monitoring is active
   - Test alert systems

3. **Communicate Status**:
   - Inform stakeholders
   - Update any status pages
   - Document lessons learned
