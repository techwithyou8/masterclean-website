#!/bin/bash

# Quick Domain Fix Script for mastercleanservice.nl
# Run with: bash scripts/quick-domain-fix.sh

echo "🔧 MasterClean Domain Quick Fix Script"
echo "======================================"

DOMAIN="mastercleanservice.nl"
EXPECTED_IP="76.76.21.21"
VERCEL_CNAME="cname.vercel-dns.com"

echo ""
echo "🔍 Step 1: Checking current DNS status..."

# Check A record
echo "Checking A record for $DOMAIN..."
A_RECORD=$(nslookup $DOMAIN | grep "Address:" | tail -1 | awk '{print $2}')
if [ "$A_RECORD" = "$EXPECTED_IP" ]; then
    echo "✅ A record is correct: $A_RECORD"
else
    echo "❌ A record is incorrect: $A_RECORD (expected: $EXPECTED_IP)"
    echo "   → Fix: Add A record @ → $EXPECTED_IP in Hostinger DNS"
fi

# Check CNAME record
echo "Checking CNAME record for www.$DOMAIN..."
CNAME_RECORD=$(nslookup www.$DOMAIN | grep "canonical name" | awk '{print $4}')
if [[ "$CNAME_RECORD" == *"vercel"* ]]; then
    echo "✅ CNAME record points to Vercel: $CNAME_RECORD"
else
    echo "❌ CNAME record is incorrect: $CNAME_RECORD"
    echo "   → Fix: Add CNAME www → $VERCEL_CNAME in Hostinger DNS"
fi

echo ""
echo "🌐 Step 2: Testing domain accessibility..."

# Test HTTPS access
echo "Testing https://$DOMAIN..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN)
if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ HTTPS access working: $HTTP_STATUS"
elif [ "$HTTP_STATUS" = "404" ]; then
    echo "❌ 404 NOT FOUND error detected"
    echo "   → This indicates DNS is working but Vercel configuration issue"
elif [ "$HTTP_STATUS" = "000" ]; then
    echo "❌ Cannot connect to domain"
    echo "   → This indicates DNS resolution issue"
else
    echo "⚠️  Unexpected status: $HTTP_STATUS"
fi

# Test WWW variant
echo "Testing https://www.$DOMAIN..."
WWW_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://www.$DOMAIN)
if [ "$WWW_STATUS" = "200" ]; then
    echo "✅ WWW access working: $WWW_STATUS"
elif [ "$WWW_STATUS" = "404" ]; then
    echo "❌ WWW returns 404"
else
    echo "⚠️  WWW status: $WWW_STATUS"
fi

echo ""
echo "🔒 Step 3: Checking SSL certificate..."

# Check SSL
SSL_CHECK=$(curl -s -I https://$DOMAIN | head -1)
if [[ "$SSL_CHECK" == *"200"* ]]; then
    echo "✅ SSL certificate is working"
else
    echo "❌ SSL certificate issue detected"
    echo "   → Wait for automatic SSL provisioning (up to 24 hours)"
fi

echo ""
echo "📋 Step 4: Diagnosis and recommendations..."

# Determine the most likely issue
if [ "$A_RECORD" != "$EXPECTED_IP" ]; then
    echo "🎯 PRIMARY ISSUE: DNS A record not configured"
    echo ""
    echo "IMMEDIATE ACTION REQUIRED:"
    echo "1. Log into Hostinger control panel"
    echo "2. Go to DNS Zone for $DOMAIN"
    echo "3. Add/update A record:"
    echo "   Type: A"
    echo "   Name: @ (or leave empty)"
    echo "   Value: $EXPECTED_IP"
    echo "   TTL: 3600"
    echo ""
elif [[ "$CNAME_RECORD" != *"vercel"* ]]; then
    echo "🎯 PRIMARY ISSUE: DNS CNAME record not configured"
    echo ""
    echo "IMMEDIATE ACTION REQUIRED:"
    echo "1. Log into Hostinger control panel"
    echo "2. Go to DNS Zone for $DOMAIN"
    echo "3. Add/update CNAME record:"
    echo "   Type: CNAME"
    echo "   Name: www"
    echo "   Value: $VERCEL_CNAME"
    echo "   TTL: 3600"
    echo ""
elif [ "$HTTP_STATUS" = "404" ]; then
    echo "🎯 PRIMARY ISSUE: Domain not configured in Vercel"
    echo ""
    echo "IMMEDIATE ACTION REQUIRED:"
    echo "1. Go to Vercel Dashboard"
    echo "2. Select your MasterClean project"
    echo "3. Go to Settings → Domains"
    echo "4. Click 'Add Domain'"
    echo "5. Enter: $DOMAIN"
    echo "6. Follow verification steps"
    echo ""
else
    echo "🎯 ISSUE: DNS propagation or other technical issue"
    echo ""
    echo "RECOMMENDED ACTIONS:"
    echo "1. Wait 30 minutes for DNS propagation"
    echo "2. Clear your DNS cache:"
    echo "   - Windows: ipconfig /flushdns"
    echo "   - Mac: sudo dscacheutil -flushcache"
    echo "   - Linux: sudo systemctl restart systemd-resolved"
    echo "3. Try accessing from different network/device"
    echo ""
fi

echo "🔗 HELPFUL LINKS:"
echo "• Hostinger Control Panel: https://hostinger.com"
echo "• Vercel Dashboard: https://vercel.com/dashboard"
echo "• DNS Propagation Checker: https://whatsmydns.net/?d=$DOMAIN&t=A"
echo "• SSL Test: https://ssllabs.com/ssltest/analyze.html?d=$DOMAIN"

echo ""
echo "⏱️  EXPECTED TIMELINE:"
echo "• DNS changes take effect: 15-30 minutes"
echo "• Global DNS propagation: 2-48 hours"
echo "• SSL certificate provisioning: 1-24 hours"

echo ""
echo "📞 NEED HELP?"
echo "• Hostinger Support: Live chat 24/7"
echo "• Vercel Support: https://vercel.com/help"

echo ""
echo "🔄 Run this script again in 30 minutes to check progress"
