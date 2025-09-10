# 🔍 Website Verification Checklist - mastercleanservice.nl

## Pre-Verification Requirements
- [ ] Website deployed to Vercel successfully
- [ ] Custom domain `mastercleanservice.nl` configured
- [ ] DNS records propagated (A record: 76.76.21.21, CNAME: cname.vercel-dns.com)
- [ ] SSL certificate active and valid

---

## 1. Domain & SSL Verification

### 1.1 Domain Accessibility
- [ ] **Primary Domain**: `https://mastercleanservice.nl` loads correctly
- [ ] **WWW Subdomain**: `https://www.mastercleanservice.nl` loads correctly
- [ ] **HTTP Redirect**: `http://mastercleanservice.nl` redirects to HTTPS
- [ ] **WWW HTTP Redirect**: `http://www.mastercleanservice.nl` redirects to HTTPS

### 1.2 SSL Certificate Check
- [ ] **Valid Certificate**: Browser shows lock icon (🔒)
- [ ] **Certificate Authority**: Issued by "Vercel" or "Let's Encrypt"
- [ ] **Certificate Expiry**: Valid for at least 60 days
- [ ] **No Mixed Content**: No HTTP resources on HTTPS pages

**Test Commands:**
\`\`\`bash
# Check SSL certificate
curl -I https://mastercleanservice.nl
openssl s_client -connect mastercleanservice.nl:443 -servername mastercleanservice.nl

# Check redirects
curl -I http://mastercleanservice.nl
curl -I http://www.mastercleanservice.nl
\`\`\`

---

## 2. Page Loading & Navigation

### 2.1 Core Pages Accessibility
- [ ] **Homepage**: `https://mastercleanservice.nl/` ✅
- [ ] **Services**: `https://mastercleanservice.nl/services` ✅
- [ ] **About**: `https://mastercleanservice.nl/about` ✅
- [ ] **Contact**: `https://mastercleanservice.nl/contact` ✅

### 2.2 Language Support
- [ ] **Dutch (Default)**: `https://mastercleanservice.nl/?lang=nl` ✅
- [ ] **German**: `https://mastercleanservice.nl/?lang=de` ✅
- [ ] **English**: `https://mastercleanservice.nl/?lang=en` ✅

### 2.3 Navigation Testing
- [ ] **Header Navigation**: All menu items work correctly
- [ ] **Footer Links**: All footer links functional
- [ ] **Language Selector**: Switches languages properly
- [ ] **Logo Link**: Returns to homepage
- [ ] **Mobile Menu**: Hamburger menu works on mobile

---

## 3. Content Verification

### 3.1 Text Content
- [ ] **Company Name**: "MasterClean" displayed correctly
- [ ] **Phone Number**: "+31 (0)85 0805636" appears consistently
- [ ] **Email**: "info@mastercleanservice.nl" shown correctly
- [ ] **Service Areas**: "Zeeland & Noord-Holland" mentioned
- [ ] **Multilingual Content**: All languages display proper translations

### 3.2 Images & Media
- [ ] **Logo**: MasterClean logo loads and displays properly
- [ ] **Hero Images**: Main banner images load correctly
- [ ] **Service Images**: All service section images display
- [ ] **Team Photos**: About page team member photos load
- [ ] **Image Alt Text**: All images have proper alt attributes
- [ ] **Image Optimization**: Images load quickly and are properly sized

### 3.3 Interactive Elements
- [ ] **Call-to-Action Buttons**: All CTA buttons work
- [ ] **Phone Links**: `tel:+31850805636` opens phone app
- [ ] **Email Links**: `mailto:info@mastercleanservice.nl` opens email client
- [ ] **Hover Effects**: Buttons and cards show hover states
- [ ] **Animations**: Loading animations and transitions work

---

## 4. Contact Form Testing

### 4.1 Form Functionality
- [ ] **Form Display**: Contact form renders correctly
- [ ] **Required Fields**: Name, email, message marked as required
- [ ] **Field Validation**: Email format validation works
- [ ] **Submit Button**: Form submission works without errors
- [ ] **Loading State**: Shows "Versturen..." during submission
- [ ] **Success Message**: Displays confirmation after successful submission
- [ ] **Error Handling**: Shows appropriate error messages

### 4.2 Email Delivery Testing
- [ ] **Test Submission**: Submit test contact form
- [ ] **Email to Company**: Check `info@mastercleanservice.nl` receives email
- [ ] **Confirmation Email**: Customer receives confirmation email
- [ ] **Email Content**: Both emails contain correct information
- [ ] **Email Formatting**: HTML emails display properly
- [ ] **Spam Check**: Emails don't go to spam folder

**Test Form Data:**
\`\`\`
Name: Test User
Email: your-test-email@example.com
Phone: +31 6 12345678
Message: This is a test submission to verify the contact form functionality.
\`\`\`

---

## 5. Responsive Design Testing

### 5.1 Desktop Testing (1920x1080)
- [ ] **Layout**: All elements properly positioned
- [ ] **Navigation**: Horizontal menu displays correctly
- [ ] **Content**: Text readable and well-spaced
- [ ] **Images**: Proper sizing and aspect ratios
- [ ] **Forms**: Contact form displays in full width

### 5.2 Tablet Testing (768x1024)
- [ ] **Layout**: Responsive grid adjustments
- [ ] **Navigation**: Menu remains accessible
- [ ] **Content**: Text remains readable
- [ ] **Images**: Scale appropriately
- [ ] **Touch Targets**: Buttons large enough for touch

### 5.3 Mobile Testing (375x667)
- [ ] **Layout**: Single column layout
- [ ] **Navigation**: Hamburger menu functions
- [ ] **Content**: Text readable without zooming
- [ ] **Images**: Optimized for mobile
- [ ] **Forms**: Easy to fill on mobile
- [ ] **Phone Links**: Tap-to-call works

### 5.4 Large Screen Testing (2560x1440)
- [ ] **Layout**: Content doesn't stretch too wide
- [ ] **Navigation**: Remains proportional
- [ ] **Content**: Maintains readability
- [ ] **Images**: High resolution versions load

---

## 6. Browser Compatibility Testing

### 6.1 Chrome (Latest)
- [ ] **Functionality**: All features work
- [ ] **Performance**: Fast loading times
- [ ] **Console**: No JavaScript errors
- [ ] **Responsive**: Mobile view works

### 6.2 Firefox (Latest)
- [ ] **Functionality**: All features work
- [ ] **Performance**: Acceptable loading times
- [ ] **Console**: No JavaScript errors
- [ ] **Responsive**: Mobile view works

### 6.3 Safari (Latest)
- [ ] **Functionality**: All features work
- [ ] **Performance**: Good loading times
- [ ] **Console**: No JavaScript errors
- [ ] **Responsive**: Mobile view works

### 6.4 Edge (Latest)
- [ ] **Functionality**: All features work
- [ ] **Performance**: Good loading times
- [ ] **Console**: No JavaScript errors
- [ ] **Responsive**: Mobile view works

### 6.5 Mobile Browsers
- [ ] **Chrome Mobile**: Full functionality
- [ ] **Safari Mobile**: Full functionality
- [ ] **Samsung Internet**: Basic functionality
- [ ] **Firefox Mobile**: Basic functionality

---

## 7. Performance Testing

### 7.1 Loading Speed
- [ ] **First Contentful Paint**: < 2 seconds
- [ ] **Largest Contentful Paint**: < 3 seconds
- [ ] **Time to Interactive**: < 4 seconds
- [ ] **Cumulative Layout Shift**: < 0.1

### 7.2 Performance Tools
- [ ] **Google PageSpeed Insights**: Score > 90
- [ ] **GTmetrix**: Grade A or B
- [ ] **WebPageTest**: Load time < 3 seconds
- [ ] **Lighthouse**: Performance score > 90

**Test URLs:**
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://webpagetest.org/)

---

## 8. SEO & Accessibility Testing

### 8.1 SEO Elements
- [ ] **Page Titles**: Unique and descriptive for each page
- [ ] **Meta Descriptions**: Present and relevant
- [ ] **Headings**: Proper H1, H2, H3 structure
- [ ] **Alt Text**: All images have descriptive alt text
- [ ] **Structured Data**: Contact information markup
- [ ] **Sitemap**: XML sitemap accessible
- [ ] **Robots.txt**: Properly configured

### 8.2 Accessibility (WCAG 2.1)
- [ ] **Keyboard Navigation**: All elements accessible via keyboard
- [ ] **Screen Reader**: Content readable by screen readers
- [ ] **Color Contrast**: Sufficient contrast ratios
- [ ] **Focus Indicators**: Visible focus states
- [ ] **ARIA Labels**: Proper ARIA attributes
- [ ] **Form Labels**: All form fields properly labeled

**Accessibility Tools:**
- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)

---

## 9. Security Testing

### 9.1 HTTPS Configuration
- [ ] **Force HTTPS**: All HTTP requests redirect to HTTPS
- [ ] **HSTS Headers**: Strict-Transport-Security header present
- [ ] **Secure Cookies**: Cookies marked as secure
- [ ] **Mixed Content**: No insecure resources loaded

### 9.2 Security Headers
- [ ] **X-Frame-Options**: DENY or SAMEORIGIN
- [ ] **X-Content-Type-Options**: nosniff
- [ ] **Referrer-Policy**: Appropriate policy set
- [ ] **Content-Security-Policy**: CSP headers configured

**Security Test Tools:**
- [Security Headers](https://securityheaders.com/)
- [SSL Labs SSL Test](https://ssllabs.com/ssltest/)
- [Mozilla Observatory](https://observatory.mozilla.org/)

---

## 10. Functional Testing Scenarios

### 10.1 User Journey: Service Inquiry
1. [ ] **Landing**: User arrives at homepage
2. [ ] **Browse**: User clicks "Diensten" in navigation
3. [ ] **Select**: User chooses "Vakantiehuizen Schoonmaken"
4. [ ] **Contact**: User clicks "Vraag Offerte"
5. [ ] **Form**: User fills contact form
6. [ ] **Submit**: User submits form successfully
7. [ ] **Confirmation**: User sees success message

### 10.2 User Journey: Direct Contact
1. [ ] **Landing**: User arrives at homepage
2. [ ] **Call**: User clicks "BEL NU" button
3. [ ] **Phone**: Phone app opens with correct number
4. [ ] **Alternative**: User tries email link
5. [ ] **Email**: Email client opens with correct address

### 10.3 User Journey: Language Switch
1. [ ] **Default**: Site loads in Dutch
2. [ ] **Switch**: User changes to German
3. [ ] **Content**: All content updates to German
4. [ ] **Navigation**: User navigates to different page
5. [ ] **Persistence**: Language preference maintained
6. [ ] **Switch Back**: User changes to English
7. [ ] **Verification**: All content in English

---

## 11. Error Testing

### 11.1 404 Error Handling
- [ ] **Invalid URL**: `https://mastercleanservice.nl/invalid-page`
- [ ] **Error Page**: Custom 404 page displays
- [ ] **Navigation**: User can navigate back to site
- [ ] **Search**: Search functionality available (if implemented)

### 11.2 Form Error Handling
- [ ] **Empty Required Fields**: Proper validation messages
- [ ] **Invalid Email**: Email format validation
- [ ] **Network Error**: Graceful handling of network issues
- [ ] **Server Error**: Appropriate error messages

### 11.3 JavaScript Disabled
- [ ] **Basic Functionality**: Site remains usable
- [ ] **Contact Info**: Phone and email links work
- [ ] **Navigation**: Basic navigation functional
- [ ] **Content**: All content accessible

---

## 12. Analytics & Monitoring

### 12.1 Analytics Setup (Optional)
- [ ] **Google Analytics**: Tracking code installed
- [ ] **Google Search Console**: Domain verified
- [ ] **Conversion Tracking**: Contact form submissions tracked
- [ ] **Event Tracking**: Phone clicks and email clicks tracked

### 12.2 Monitoring Setup
- [ ] **Uptime Monitoring**: Service monitoring configured
- [ ] **Error Tracking**: JavaScript error monitoring
- [ ] **Performance Monitoring**: Core Web Vitals tracking
- [ ] **SSL Monitoring**: Certificate expiry monitoring

---

## Testing Tools & Resources

### Browser Developer Tools
\`\`\`javascript
// Console commands for testing
// Check for JavaScript errors
console.log('No errors should appear above this line');

// Test responsive design
// Ctrl+Shift+M (Chrome/Firefox) or Cmd+Shift+M (Safari)

// Network tab - check loading times
// Look for failed requests (red entries)
\`\`\`

### Online Testing Tools
1. **Responsive Design**: [Responsinator](http://responsinator.com/)
2. **Cross-Browser**: [BrowserStack](https://browserstack.com/)
3. **Performance**: [WebPageTest](https://webpagetest.org/)
4. **SEO**: [SEMrush Site Audit](https://semrush.com/)
5. **Accessibility**: [WAVE](https://wave.webaim.org/)

### Mobile Testing
- **iOS Safari**: Test on actual iPhone/iPad
- **Android Chrome**: Test on actual Android device
- **Responsive Mode**: Use browser developer tools
- **Touch Testing**: Verify all touch interactions

---

## Issue Reporting Template

When issues are found, use this template:

\`\`\`markdown
## Issue Report

**Issue Type**: [Bug/Performance/Design/Content]
**Severity**: [Critical/High/Medium/Low]
**Browser**: [Chrome 120/Firefox 121/Safari 17/etc.]
**Device**: [Desktop/Mobile/Tablet]
**Screen Size**: [1920x1080/375x667/etc.]

**Description**:
[Detailed description of the issue]

**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Result**:
[What should happen]

**Actual Result**:
[What actually happens]

**Screenshot/Video**:
[Attach if applicable]

**Additional Notes**:
[Any other relevant information]
\`\`\`

---

## Final Verification Checklist

### Critical Items (Must Pass)
- [ ] **Domain Access**: Site loads on mastercleanservice.nl
- [ ] **SSL Certificate**: Valid HTTPS certificate
- [ ] **Contact Form**: Form submits and sends emails
- [ ] **Phone Links**: Tap-to-call functionality works
- [ ] **Mobile Responsive**: Site works on mobile devices
- [ ] **No Console Errors**: No JavaScript errors in browser console

### Important Items (Should Pass)
- [ ] **Performance**: PageSpeed score > 80
- [ ] **All Languages**: Dutch, German, English all work
- [ ] **Cross-Browser**: Works in Chrome, Firefox, Safari, Edge
- [ ] **Accessibility**: Basic accessibility requirements met
- [ ] **SEO**: Proper meta tags and structure

### Nice-to-Have Items (Good to Pass)
- [ ] **Perfect Performance**: PageSpeed score > 95
- [ ] **Advanced Accessibility**: WCAG 2.1 AA compliance
- [ ] **Analytics**: Tracking properly configured
- [ ] **Monitoring**: Uptime monitoring active

---

## Sign-Off

**Tested By**: ________________
**Date**: ________________
**Overall Status**: [ ] PASS [ ] FAIL [ ] PASS WITH ISSUES

**Critical Issues Found**: ________________
**Recommendations**: ________________
**Next Steps**: ________________
