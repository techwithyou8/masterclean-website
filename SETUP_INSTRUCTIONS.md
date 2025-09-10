# MasterClean Website Setup Instructions

## 🚨 CRITICAL: API Key Setup Required

The contact form requires a Resend API key to function. Follow these steps carefully:

### Step 1: Get Your Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (no credit card required)
3. Verify your email address
4. Go to your dashboard
5. Navigate to "API Keys" section
6. Click "Create API Key"
7. Give it a name (e.g., "MasterClean Website")
8. Copy the generated key (it starts with `re_`)

### Step 2: Create Environment File

1. In the root directory of the project, create a file named `.env.local`
2. Add your API key to the file:

\`\`\`env
RESEND_API_KEY=re_your_actual_api_key_here
\`\`\`

**Example:**
\`\`\`env
RESEND_API_KEY=re_123abc456def789ghi012jkl345mno678pqr
\`\`\`

### Step 3: Verify Setup

1. Restart your development server:
\`\`\`bash
npm run dev
\`\`\`

2. Open the website in your browser
3. Go to the Contact page
4. In development mode, you'll see a debug panel showing if the API key is properly loaded
5. Test the contact form

### Step 4: Production Setup

For production deployment:

1. Add the `RESEND_API_KEY` environment variable to your hosting platform
2. Verify your domain with Resend (required for production email sending)
3. Update the `from` email address in `lib/actions.ts` to use your verified domain

### Troubleshooting

#### "Missing API key" Error
- ✅ Check that `.env.local` file exists in the root directory
- ✅ Verify the API key starts with `re_`
- ✅ Restart the development server after adding the key
- ✅ Check the debug panel in development mode

#### Email Not Sending
- ✅ Verify your Resend account is active
- ✅ Check that your domain is verified (for production)
- ✅ Look at the browser console for error messages
- ✅ Check the server logs for detailed error information

#### Form Submission Issues
- ✅ Ensure JavaScript is enabled in the browser
- ✅ Check network connectivity
- ✅ Verify the form fields are properly filled
- ✅ Look for error messages in the form

### Security Notes

- ✅ Never commit `.env.local` to version control
- ✅ The API key is only used on the server side
- ✅ Users cannot see your API key in the browser
- ✅ The application gracefully handles missing API keys

### Support

If you continue to have issues:

1. Check the debug information in development mode
2. Look at the browser console for errors
3. Check the server logs
4. Verify your Resend account status
5. Contact Resend support if needed

The application includes comprehensive error handling and will provide clear feedback about any configuration issues.
