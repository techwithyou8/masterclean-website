# MasterClean Website

A professional cleaning services website built with Next.js, featuring multilingual support and contact form functionality.

## Features

- Multilingual support (Dutch, German, English)
- Contact form with validation
- Responsive design
- SEO optimized
- Professional cleaning services showcase
- Direct contact integration (phone/email)

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## Contact Form

The contact form is designed to:
- Validate user input
- Provide immediate feedback
- Encourage direct contact via phone or email
- Work without external email service dependencies

For production email integration, you can:
- Add email service providers (Resend, SendGrid, etc.)
- Integrate with Hostinger email via SMTP
- Use contact form services (Formspree, Netlify Forms)

## Deployment (Vercel)

Recommended: Vercel (first-class Next.js hosting)

- 1) Push this repository to GitHub/GitLab/Bitbucket
- 2) In Vercel, click "New Project" → Import your repo → Framework = Next.js
- 3) Environment variables (Project Settings → Environment Variables):
  - RESEND_API_KEY = {{RESEND_API_KEY}} (optional)
  - EMAIL_HOST = smtp.hostinger.com (if using SMTP)
  - EMAIL_PORT = 587
  - EMAIL_USER = info@mastercleanservice.nl
  - EMAIL_PASS = {{EMAIL_SMTP_PASSWORD}}
- 4) Build & Output Settings: keep defaults (Build Command: next build, Output: .next)
- 5) Click Deploy

CLI alternative (non-interactive steps):
- Install: npm i -g vercel
- Link project: vercel link --project masterclean-website-main (follow prompts)
- Set env vars: vercel env add (add the variables above in each environment)
- Deploy preview: vercel --prod

Notes:
- We set engines.node to 20.x for consistent builds.
- Next/Image is configured to serve WebP/AVIF on Vercel automatically.
- Service worker file exists at public/sw.js.

## Contact Information

- Phone: +31 (0)85 0805636
- Email: info@mastercleanservice.nl
- Service Area: Zeeland & Noord-Holland

## Development

- Built with Next.js 15
- Styled with Tailwind CSS
- Uses shadcn/ui components
- TypeScript for type safety
