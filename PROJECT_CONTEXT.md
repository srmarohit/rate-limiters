# Next.js 16 Project - Context and Architecture

## Project Overview

This is a Next.js 16 application demonstrating modern React patterns with server components, client components, and TypeScript. The project showcases a hybrid architecture with server-side rendering (SSR) for initial content and client-side interactivity for dynamic features.

## Technology Stack

### Core Dependencies

- **Next.js**: 16.3.3 (Latest stable with React 19)
- **React**: 19.2.8
- **TypeScript**: Latest
- **Tailwind CSS**: v4 (via PostCSS)
- **ESLint**: v9 with Next.js configuration

### Key Features

- React Compiler enabled for automatic optimizations
- Turbopack file system cache for development
- Type-safe development with TypeScript
- Modern ESLint configuration
- Tailwind CSS v4 with PostCSS

## Project Structure

```
next-16-app/
├── app/                          # Next.js App Router
│   ├── (root)/                  # Root route group
│   │   ├── about/              # About page route
│   │   │   ├── page.tsx
│   │   │   └── error.tsx
│   │   └── layout.tsx
│   ├── (users)/                 # Users route group
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── users/
│   │       ├── page.tsx        # Users page (server component)
│   │       └── [id]/
│   │           └── page.tsx    # Dynamic user detail page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/                  # Reusable components
│   └── ui/                     # UI components
│       ├── loading-skeleton.tsx # Loading skeleton component
│       ├── comment-section.tsx  # Client-side comment component
│       └── skeleton.tsx         # Basic skeleton component
├── lib/                        # Utility functions and API layer
│   ├── post.ts                # Server-only API functions
│   └── post-client.ts         # Client-compatible API functions
├── public/                     # Static assets
└── [configuration files]       # Config files (see below)
```

## Key Components

### 1. Server Components

**Location**: `app/(users)/users/page.tsx`

- Fetches posts server-side using `getPosts()` from `lib/post.ts`
- Uses Next.js fetch with revalidation (`revalidate: 3600`)
- Renders initial content on the server
- Implements proper error boundaries and loading states

### 2. Client Components

**Location**: `components/ui/comment-section.tsx`

- Uses `'use client'` directive for client-side rendering
- Fetches comments dynamically via client-side API calls
- Implements interactive features (show/hide, add comments)
- Manages local state with React hooks

### 3. Loading Skeletons

**Location**: `components/ui/loading-skeleton.tsx`

- Comprehensive loading state with animated pulse
- Responsive grid layout
- Dark mode support
- Used in `app/(users)/loading.tsx`

## API Layer Architecture

### Server-Only Functions (`lib/post.ts`)

```typescript
import "server-only";

export async function getPosts() {
  // Server-side fetch with revalidation
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3600 },
  });
  return res.json();
}

export async function getPostById(id: string) {
  // Individual post fetch with revalidation
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 3600 },
  });
  return res.json();
}
```

### Client-Compatible Functions (`lib/post-client.ts`)

```typescript
export async function getPostComments(postId: string) {
  // Client-side fetch for comments
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
  );
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}
```

## TypeScript Configuration

**Key Settings** (`tsconfig.json`):

- Path alias: `@/*` → `./*` for cleaner imports
- React JSX mode
- Strict TypeScript checks
- ES2017 target with modern modules

## Styling System

### Tailwind CSS v4

- Configured via PostCSS
- Custom theme with dark mode support
- Responsive design utilities
- Utility-first CSS approach

### Global Styles (`app/globals.css`)

- Custom CSS variables for theming
- Dark mode media queries
- Base styles for consistent design

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture Patterns

### 1. Hybrid Rendering

- **Server Components**: For data fetching and initial render
- **Client Components**: For interactivity and dynamic updates
- **Progressive Enhancement**: Core content works without JavaScript

### 2. API Separation

- **Server Functions**: Use `import 'server-only'` for server-side code
- **Client Functions**: Plain fetch functions for client-side use
- **Type Safety**: TypeScript interfaces for all API responses

### 3. Performance Optimization

- **Next.js Fetch Caching**: Automatic revalidation and caching
- **React Compiler**: Automatic memoization and optimization
- **Code Splitting**: Automatic by route and component
- **Image Optimization**: Next.js Image component (when used)

## Development Guidelines

### 1. Component Organization

- Place UI components in `components/ui/`
- Use clear, descriptive component names
- Follow TypeScript interface patterns
- Implement proper error boundaries

### 2. API Design

- Separate server and client API functions
- Use proper error handling
- Implement loading states
- Cache appropriately based on data volatility

### 3. Styling Approach

- Use Tailwind CSS utility classes
- Implement dark mode variants
- Follow responsive design principles
- Keep custom CSS minimal

### 4. TypeScript Best Practices

- Define interfaces for all data types
- Use strict TypeScript configuration
- Avoid `any` types
- Use proper import/export patterns

## Environment Configuration

### Development

- React Compiler enabled for automatic optimizations
- Turbopack caching for faster development
- Hot module replacement (HMR)
- ESLint with Next.js rules

### Production

- Optimized builds with code splitting
- Static generation where possible
- Image optimization
- Performance monitoring ready

## Testing Strategy

### Built-in Features

- TypeScript compilation as first-level test
- ESLint for code quality
- Next.js build validation

### Recommended Additions

- Unit tests for utility functions
- Integration tests for components
- End-to-end tests for critical user flows
- Performance testing for key pages

## Deployment Considerations

### Static Export

- Suitable for mostly static content
- Use `next export` for static sites
- CDN deployment for global distribution

### Server Deployment

- Node.js runtime required
- Server-side rendering capabilities
- Dynamic route support
- API route handling

### Platform-Specific

- Vercel for optimal Next.js experience
- AWS/Azure/GCP with Node.js support
- Docker containers for consistent environments

## Future Enhancements

### Potential Improvements

1. **State Management**: Add Zustand or React Context for global state
2. **Authentication**: Implement NextAuth.js for user authentication
3. **Database Integration**: Add Prisma or Drizzle for database operations
4. **API Routes**: Create custom API endpoints for specific needs
5. **Analytics**: Add Plausible or Google Analytics for insights
6. **Internationalization**: Implement next-intl for multi-language support
7. **Testing**: Add Jest/React Testing Library for comprehensive testing

### Scalability Considerations

- Implement proper caching strategies
- Add database connection pooling
- Consider edge runtime for global performance
- Monitor bundle sizes and optimize as needed

## Important Notes

### Breaking Changes in Next.js 16

This version includes significant changes from previous Next.js versions:

- Different APIs and conventions
- Updated file structure patterns
- New React 19 features and patterns
- Always check `node_modules/next/dist/docs/` for specific guidance

### React Compiler

Enabled via `reactCompiler: true` in `next.config.ts`

- Automatically optimizes React components
- Reduces manual memoization needs
- Improves performance without code changes

### Type Safety

The project uses strict TypeScript configuration:

- All components have proper TypeScript interfaces
- API responses are typed
- Runtime type checking where necessary

## Getting Started for New Developers

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Start development server**: `npm run dev`
4. **Explore the codebase** using this documentation
5. **Check open files** for current development context
6. **Refer to component implementations** for patterns
7. **Use TypeScript** for all new code

This documentation should provide comprehensive context for understanding and working with the Next.js 16 application architecture.

## OAuth 2.0 Authentication Setup

### Authentication Architecture

The application implements OAuth 2.0 authentication with the following components:

1. **Authentication Provider**: NextAuth.js (Auth.js) v5
2. **OAuth Provider**: GitHub (easily extendable to Google, Facebook, etc.)
3. **Route Protection**: Next.js middleware-based protection
4. **Session Management**: JWT-based sessions with 30-day expiration

### Authentication Flow

```
Public User → Access Protected Route → Middleware Redirect → Sign In Page → GitHub OAuth →
Redirect Back → Session Created → Access Granted
```

### Environment Configuration

1. **Create GitHub OAuth App**:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create a new OAuth App
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - Copy Client ID and Client Secret

2. **Update Environment Variables**:
   Copy `.env.example` to `.env.local` and update:
   ```bash
   AUTH_GITHUB_ID=your_github_client_id_here
   AUTH_GITHUB_SECRET=your_github_client_secret_here
   AUTH_SECRET=your_auth_secret_here  # Generate with: openssl rand -base64 32
   NEXTAUTH_URL=http://localhost:3000
   ```

### Route Protection Strategy

#### Public Routes (No authentication required)

- `/` - Home page
- `/about` - About page
- `/auth/signin` - Sign in page
- `/auth/error` - Authentication error page

#### Protected Routes (Authentication required)

- `/users` - Users dashboard and all sub-routes
- Any route starting with `/users/`

### Key Authentication Files

1. **`lib/auth.ts`**: Authentication configuration
   - GitHub OAuth provider setup
   - JWT and session callbacks
   - Authentication options and secrets

2. **`middleware.ts`**: Route protection middleware
   - Checks authentication status
   - Redirects unauthenticated users to sign in
   - Allows public routes without authentication

3. **`app/api/auth/[...nextauth]/route.ts`**: Authentication API routes
   - Handles OAuth callbacks
   - Manages session creation/destruction

4. **`components/ui/header.tsx`**: Authentication UI
   - Shows user profile when logged in
   - Sign in/out buttons
   - User dropdown menu

### Adding New OAuth Providers

To add additional OAuth providers (Google, Facebook, etc.):

1. Update `lib/auth.ts`:

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

2. Add environment variables:
   ```bash
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret
   ```

### Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Secret Rotation**: Regularly rotate `AUTH_SECRET` in production
3. **HTTPS**: Always use HTTPS in production for OAuth callbacks
4. **Session Management**: JWT sessions expire after 30 days
5. **CSRF Protection**: Built-in protection with Auth.js

### Testing Authentication

1. **Development Testing**:
   - Start the development server: `npm run dev`
   - Navigate to `/users` (should redirect to sign in)
   - Sign in with GitHub
   - Access `/users` (should work)

2. **Authentication States**:
   - **Public User**: Can access `/` and `/about`
   - **Authenticated User**: Can access all routes including `/users`
   - **Sign Out**: Clears session and redirects to home

### Production Deployment Notes

1. **Update Environment Variables**:
   - Set `NEXTAUTH_URL` to your production domain
   - Use production OAuth credentials
   - Use strong `AUTH_SECRET`

2. **Database Sessions (Optional)**:
   For production, consider adding database session storage:

   ```typescript
   import { PrismaAdapter } from "@auth/prisma-adapter";
   import { PrismaClient } from "@prisma/client";

   const prisma = new PrismaClient();

   export const { handlers, auth } = NextAuth({
     adapter: PrismaAdapter(prisma),
     // ... rest of config
   });
   ```

3. **Additional Security**:
   - Enable HTTPS
   - Set secure cookies
   - Configure CORS appropriately
   - Monitor authentication logs

### Troubleshooting

#### Common Issues:

1. **"Invalid OAuth State"**:
   - Check `AUTH_SECRET` is properly set
   - Ensure `NEXTAUTH_URL` matches your application URL

2. **GitHub OAuth Errors**:
   - Verify callback URL matches GitHub OAuth App settings
   - Check Client ID and Secret are correct

3. **Middleware Not Working**:
   - Ensure `middleware.ts` is in the root directory
   - Check route patterns in middleware configuration

4. **Session Not Persisting**:
   - Verify `AUTH_SECRET` is set
   - Check browser cookies are enabled
   - Ensure same-site cookie settings

### Authentication API Endpoints

- `GET /api/auth/signin` - Initiate sign in
- `GET /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session
- `GET /api/auth/callback/:provider` - OAuth callback
- `GET /api/auth/providers` - List available providers

This authentication system provides a secure, scalable foundation for user authentication in the Next.js 16 application.

## Debugging Setup

### VSCode Debug Configuration

The project includes comprehensive debugging setup for Microsoft Edge and Chrome browsers:

#### Available Debug Configurations:

1. **Next.js: Edge Browser** - Client-side debugging with Microsoft Edge
2. **Next.js: Chrome Browser** - Client-side debugging with Google Chrome
3. **Next.js: Debug Server** - Server-side debugging with Node.js inspector
4. **Next.js: Debug Full Stack** - Complete full-stack debugging (server + browser)
5. **Next.js: Attach to Server** - Attach to already running Next.js server

#### Key Debugging Files:

- `.vscode/launch.json` - Debug configurations
- `.vscode/tasks.json` - Task definitions
- `.vscode/settings.json` - Workspace settings
- `.vscode/extensions.json` - Recommended extensions
- `DEBUGGING.md` - Complete debugging guide

### How to Debug

#### Quick Start:

1. **Press F5** in VSCode
2. **Select "Next.js: Full Stack Debug"** from dropdown
3. **Set breakpoints** in your code
4. **Interact with the application** to trigger breakpoints

#### Debugging Authentication:

Key files to debug:

- `middleware.ts` - Route protection logic (line 25 for auth check)
- `lib/auth.ts` - Authentication callbacks (JWT, session)
- `app/auth/signin/page.tsx` - Sign-in flow
- `components/ui/header.tsx` - Session management UI

#### Browser Debugging:

- Edge DevTools integration via VSCode
- React DevTools for component inspection
- Network request monitoring
- Console logging and error tracking

### Development Scripts

```bash
# Standard development
npm run dev

# Development with Node inspector
npm run dev:debug

# Development with breakpoint
npm run dev:debug-brk

# Production debugging
npm run start:debug
```

### Debugging Features

- **Source Maps**: Enabled for development and production
- **Hot Reload**: Fast refresh for client components
- **Type Checking**: Real-time TypeScript validation
- **ESLint Integration**: Code quality checks on save
- **Tailwind CSS IntelliSense**: Class name suggestions

### Environment Configuration for Debugging

The `next.config.ts` includes:

- Production browser source maps
- Detailed logging for fetches
- CORS headers for cross-origin debugging
- Experimental debugging features enabled

### Common Debug Scenarios

#### 1. Debugging Authentication Flow

```typescript
// In middleware.ts - set breakpoint here
const session = await auth(); // Line 25
if (!session) {
  // Redirect logic - debug this flow
}
```

#### 2. Debugging API Calls

```typescript
// In lib/post.ts - debug server-side fetch
export async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3600 },
  });
  return res.json(); // Set breakpoint here
}
```

#### 3. Debugging Client Components

```typescript
// In any client component - add debugger statements
"use client";

export function Component() {
  const [state, setState] = useState("");

  useEffect(() => {
    debugger; // Execution pauses here
    // Your logic
  }, []);
}
```

### Performance Optimization for Debugging

- **Turbopack**: Enabled for faster development builds
- **File System Cache**: Reduces rebuild times
- **Incremental Type Checking**: Faster TypeScript validation
- **Selective Source Maps**: Only generate for debugging sessions

### Troubleshooting Debug Issues

#### 1. Breakpoints Not Hitting

- Ensure source maps are enabled
- Restart debug session
- Clear browser cache and VSCode debugging profiles

#### 2. Edge Browser Not Launching

- Check Microsoft Edge is installed
- Verify firewall settings allow local connections
- Try Chrome configuration as alternative

#### 3. Server Debugging Issues

- Verify port 3000 is available
- Check Node.js version compatibility
- Ensure environment variables are set

### Advanced Debugging Features

#### 1. Conditional Breakpoints

```typescript
// Only break when error exists
if (error) {
  debugger;
}
```

#### 2. Watch Expressions

Add to VSCode debug panel:

- `session` - Authentication session
- `posts` - Data from server
- `error` - Error state
- `loading` - Loading state

#### 3. Performance Profiling

- Use Edge/Chrome Performance tab
- Profile React component rendering
- Monitor network requests and responses

### Recommended VSCode Extensions

The `.vscode/extensions.json` includes recommended extensions for:

- TypeScript/JavaScript development
- React and Next.js tooling
- Tailwind CSS integration
- Git workflow
- Debugging tools
- Code quality and formatting

This debugging setup provides a comprehensive environment for developing, testing, and troubleshooting the Next.js 16 application with full-stack debugging capabilities.
