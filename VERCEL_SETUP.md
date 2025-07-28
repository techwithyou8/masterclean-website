# Environment Variables for Vercel Deployment

## Required Environment Variables

Add these environment variables in your Vercel dashboard:

### Email Configuration
```
RESEND_API_KEY=re_U6hu1y2F_QKWTtMPjjN9wh2Z6w1cVsTGo
```

### Application Settings
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://mastercleanservice.nl
```

## Vercel Environment Setup Steps

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add each variable with the appropriate scope:
   - Production
   - Preview 
   - Development (if needed)

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Domain settings configured
- [ ] SSL certificate enabled
- [ ] Analytics enabled (optional)
- [ ] Performance monitoring enabled

## Contact Form Testing

After deployment, test the contact form:
1. Visit the deployed site
2. Fill out the contact form
3. Verify email delivery to info@mastercleanservice.nl
4. Check confirmation email to customer
