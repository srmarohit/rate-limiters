# OAuth 2.0 Authentication Setup Guide

## Quick Setup

### 1. Install Dependencies
```bash
npm install next-auth@beta @auth/core
```

### 2. Create GitHub OAuth App
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Next.js 16 App (or your choice)
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy **Client ID** and generate a **Client Secret**

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local` and update:

```bash
# Get from GitHub OAuth App
AUTH_GITHUB_ID=your_github_client_id_here
AUTH_GITHUB_SECRET=your_github_client_secret_here

# Generate with: openssl rand -base64 32
AUTH_SECRET=your_generated_secret_here

# For production, use your domain
NEXTAUTH_URL=http://localhost:3000
```

### 4. Start the Application
```bash
npm run dev
```

## Testing Authentication

### Test Flow:
1. **Visit Home Page** (`http://localhost:3000`) - Should work without login
2. **Try to access Users Page** (`http://localhost:3000/users`) - Should redirect to sign in
3. **Sign in with GitHub** - Authorize the application
4. **Access Users Page** - Should now work
5. **Sign out** - Click profile dropdown → Sign out

## File Structure Overview

```
├── lib/
│   ├── auth.ts              # Auth configuration
│   ├── post.ts              # Server-only API functions
│   └── post-client.ts       # Client-compatible API functions
├── middleware.ts            # Route protection
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts # Auth API routes
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx     # Sign in page
│   │   └── error/
│   │       └── page.tsx     # Auth error page
│   └── (users)/
│       └── users/
│           └── page.tsx     # Protected users page
└── components/
    └── ui/
        ├── header.tsx       # Navigation with auth
        ├── comment-section.tsx
        └── loading-skeleton.tsx
```

## Adding New OAuth Providers

### Example: Adding Google OAuth

1. **Add Google OAuth App**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create credentials → OAuth 2.0 Client IDs
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

2. **Update `lib/auth.ts`**:
   ```typescript
   import Google from "next-auth/providers/google";
   
   providers: [
     GitHub({ ... }),
     Google({
       clientId: process.env.AUTH_GOOGLE_ID,
       clientSecret: process.env.AUTH_GOOGLE_SECRET,
     }),
   ]
   ```

3. **Add to `.env.local`**:
   ```bash
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret
   ```

## Troubleshooting

### Common Issues:

#### 1. "Invalid OAuth State"
- Ensure `AUTH_SECRET` is set and consistent
- Check `NEXTAUTH_URL` matches your app URL

#### 2. GitHub Authentication Fails
- Verify callback URL in GitHub OAuth App settings
- Check Client ID and Secret are correct
- Ensure app is not in development mode (if using GitHub org restrictions)

#### 3. Session Not Persisting
- Clear browser cookies
- Check `AUTH_SECRET` is properly set
- Verify same-site cookie settings

#### 4. Middleware Not Protecting Routes
- Ensure `middleware.ts` is in root directory
- Check route patterns in middleware configuration
- Restart development server after changes

### Debug Mode:
Add to `lib/auth.ts` for debugging:
```typescript
export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  // ... rest of config
});
```

## Production Deployment

### 1. Update Environment Variables:
```bash
# Production OAuth credentials
AUTH_GITHUB_ID=production_client_id
AUTH_GITHUB_SECRET=production_client_secret

# Strong secret for production
AUTH_SECRET=strong_random_secret_here

# Your production domain
NEXTAUTH_URL=https://yourdomain.com
```

### 2. Security Considerations:
- Use HTTPS in production
- Set secure cookies
- Regular secret rotation
- Monitor authentication logs

### 3. Database Sessions (Optional):
For production scalability, add database session storage with Prisma or similar.

## Support

For issues, check:
- [NextAuth.js Documentation](https://next-auth.js.org)
- [GitHub OAuth Documentation](https://docs.github.com/en/apps/oauth-apps)
- Project's `PROJECT_CONTEXT.md` for detailed architecture

---

**Note**: This setup uses GitHub OAuth for demonstration. For production, consider:
- Adding multiple OAuth providers
- Implementing database sessions
- Adding email/password authentication
- Setting up proper error handling and logging