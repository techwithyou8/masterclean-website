# 🚀 Quick Domain Setup - TL;DR Version

## What You Need to Do

### 1. In Vercel Dashboard
1. Go to your project → Settings → Domains
2. Add your domain: `mastercleanservice.nl`
3. Note the DNS values Vercel gives you

### 2. In Hostinger Control Panel
1. Go to DNS Zone for your domain
2. Delete existing A and CNAME records
3. Add these records:

\`\`\`
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
\`\`\`

### 3. Wait and Verify
- Wait 2-48 hours for DNS propagation
- Check your domain loads correctly
- Verify SSL certificate is working

## That's It!
Your domain should now point to your Vercel-hosted website.

## Need Help?
- Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
- Hostinger support: Live chat 24/7
- Vercel docs: [vercel.com/docs/concepts/projects/domains](https://vercel.com/docs/concepts/projects/domains)
