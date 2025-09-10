# Vercel Environment Variables Setup

After deploying to Vercel, you need to set up the environment variables in your Vercel dashboard:

## Required Environment Variables:

1. **RESEND_API_KEY**
   - Value: Your actual Resend API key (starts with 're_')
   - Get it from: https://resend.com

2. **NEXT_PUBLIC_SITE_URL**
   - Value: https://mastercleanservice.nl (or your Vercel URL)

## How to set them up:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add each variable for Production, Preview, and Development environments

## After setting up environment variables:

1. Redeploy your project from the Vercel dashboard
2. Test the contact form functionality
3. Verify email sending works properly

## Important Notes:

- Don't commit your actual API keys to Git
- The .env.local file is ignored by Git (as specified in .gitignore)
- Always use the .env.example file as a template for new deployments
