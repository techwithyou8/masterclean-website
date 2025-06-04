# 📧 Email Setup Guide for MasterClean Website

## Current Issue
The contact form shows success messages but emails are not being received at info@mastercleanservice.nl because the previous implementation was only simulating email sending.

## Solution: Resend API Integration

### Step 1: Get Resend API Key

1. **Sign up for Resend** (if you haven't already):
   - Go to [https://resend.com](https://resend.com)
   - Create a free account (no credit card required)
   - Verify your email address

2. **Get your API key**:
   - Log into your Resend dashboard
   - Go to "API Keys" section
   - Click "Create API Key"
   - Name it "MasterClean Website"
   - Copy the generated key (starts with `re_`)

### Step 2: Configure Environment Variables

1. **Create `.env.local` file** in your project root:
   \`\`\`env
   RESEND_API_KEY=re_your_actual_api_key_here
   \`\`\`

2. **For production deployment** (Vercel/hosting):
   - Add `RESEND_API_KEY` as an environment variable
   - Use the same API key value

### Step 3: Install Dependencies

Run this command to install the Resend package:
\`\`\`bash
npm install resend
\`\`\`

### Step 4: Test the Setup

1. **Start your development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

2. **Visit the test page**:
   - Go to `http://localhost:3000/test-email`
   - Click "Check Email Configuration"
   - Verify that the configuration shows as "Ready"

3. **Send a test email**:
   - Fill out the test form
   - Click "Send Test Email"
   - Check info@mastercleanservice.nl for the email
   - Check the test email address for confirmation

### Step 5: Production Setup (Optional)

For production email sending with your own domain:

1. **Verify your domain** with Resend:
   - Add your domain in Resend dashboard
   - Add the required DNS records
   - Wait for verification

2. **Update the email configuration**:
   - Change the `from` address in `lib/actions.ts`
   - Use your verified domain (e.g., `noreply@mastercleanservice.nl`)

## What the New Implementation Does

### ✅ Sends Real Emails
- Uses Resend API to send actual emails
- Sends to info@mastercleanservice.nl
- Sends confirmation email to the customer

### ✅ Professional Email Templates
- HTML formatted emails with company branding
- Clear contact information display
- Call-to-action for urgent responses

### ✅ Error Handling
- Comprehensive error messages
- Fallback contact information
- Debug information in development

### ✅ Logging & Debugging
- Detailed console logs for troubleshooting
- Environment configuration checker
- Test page for verification

## Troubleshooting

### "Missing API key" Error
- ✅ Ensure `.env.local` file exists in project root
- ✅ Verify API key starts with `re_`
- ✅ Restart development server after adding key

### "API key is invalid" Error
- ✅ Check that you copied the full API key
- ✅ Verify the key in your Resend dashboard
- ✅ Make sure the key hasn't been deleted or regenerated

### Emails Not Received
- ✅ Check spam/junk folders
- ✅ Verify the email address info@mastercleanservice.nl exists
- ✅ Check Resend dashboard for delivery logs
- ✅ Use the test page to verify configuration

### Rate Limiting
- ✅ Resend free tier has sending limits
- ✅ Check your usage in Resend dashboard
- ✅ Consider upgrading if needed for high volume

## Testing Checklist

- [ ] API key configured in `.env.local`
- [ ] Development server restarted
- [ ] Test page shows "Configuration Ready"
- [ ] Test email sent successfully
- [ ] Email received at info@mastercleanservice.nl
- [ ] Confirmation email received at test address
- [ ] Contact form on main website works
- [ ] Production environment variables set (if deploying)

## Support

If you continue to have issues:

1. Check the browser console for error messages
2. Check the server logs in your terminal
3. Use the test page at `/test-email` for debugging
4. Verify your Resend account status and limits
5. Check Resend's delivery logs in their dashboard

The new implementation provides comprehensive error handling and will give you clear feedback about any configuration issues.
