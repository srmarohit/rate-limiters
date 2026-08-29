# Debugging Next.js 16 Application

This guide covers debugging the Next.js 16 application with Microsoft Edge browser and VSCode.

## Quick Start

### Option 1: Full Stack Debugging (Recommended)
1. Press `F5` in VSCode
2. Select `Next.js: Full Stack Debug` from the dropdown
3. This starts both the Next.js server and Edge browser
4. Set breakpoints in your code

### Option 2: Browser-Only Debugging
1. First, start the development server: `npm run dev`
2. Press `F5` in VSCode
3. Select `Next.js: Edge Browser`
4. Debug client-side code in Edge

### Option 3: Server-Only Debugging
1. Press `F5` in VSCode
2. Select `Next.js: Debug Server`
3. Debug server-side code and API routes

## Debug Configurations

### Available Debug Configurations:

1. **Next.js: Edge Browser**
   - Launches Microsoft Edge with debugging enabled
   - Connects to `http://localhost:3000`
   - Debugs client-side React code

2. **Next.js: Chrome Browser**
   - Launches Google Chrome with debugging enabled
   - Alternative to Edge debugging

3. **Next.js: Debug Server**
   - Starts Next.js development server with Node.js inspector
   - Debugs server-side code, API routes, and server components

4. **Next.js: Debug Full Stack**
   - Starts server and automatically opens Edge browser
   - Complete full-stack debugging experience

5. **Next.js: Attach to Server**
   - Attaches to an already running Next.js server
   - Use when server is started separately

## Setting Breakpoints

### Client-Side Components (React)
1. Open any `.tsx` file with `'use client'` directive
2. Click in the gutter next to line numbers to set breakpoints
3. Examples:
   - `components/ui/comment-section.tsx`
   - `app/auth/signin/page.tsx`
   - `components/ui/header.tsx`

### Server Components and API Routes
1. Open any server-side file (no `'use client'`)
2. Set breakpoints in:
   - `app/(users)/users/page.tsx`
   - `lib/auth.ts`
   - `middleware.ts`
   - API route handlers

### Authentication Debugging
Key files to debug:
- `lib/auth.ts` - Authentication configuration and callbacks
- `middleware.ts` - Route protection logic
- `app/auth/signin/page.tsx` - Sign-in flow
- `components/ui/header.tsx` - Session management

## Debugging Features

### 1. **Console Logging**
Add console logs for debugging:
```typescript
// Server components
console.log('Server-side data:', data);

// Client components
console.log('Client state:', state);
console.log('Session:', session);
```

### 2. **Debugger Statements**
Add `debugger` statements in your code:
```typescript
export default function Component() {
  const [state, setState] = useState('');
  
  useEffect(() => {
    debugger; // Execution will pause here
    fetchData();
  }, []);
}
```

### 3. **Watch Expressions**
In VSCode debug panel, add watch expressions:
- `session` - Current authentication session
- `posts` - Data from server
- `error` - Error state
- `loading` - Loading state

### 4. **Call Stack**
View the call stack to trace execution flow through:
- React component lifecycle
- Authentication middleware
- API route handlers
- Server component rendering

## Debugging Authentication Flow

### Common Debug Points:

1. **Middleware Authentication Check**
   ```typescript
   // Set breakpoint in middleware.ts
   const session = await auth(); // Line 25
   if (!session) {
     // Redirect to signin
   }
   ```

2. **GitHub OAuth Callback**
   ```typescript
   // Set breakpoint in lib/auth.ts
   async jwt({ token, user }) {
     debugger; // Line 18
     if (user) {
       token.id = user.id;
     }
     return token;
   }
   ```

3. **Sign-in Page**
   ```typescript
   // Set breakpoint in app/auth/signin/page.tsx
   const handleGitHubSignIn = async () => {
     debugger; // Line 24
     const result = await signIn("github", {
       callbackUrl,
       redirect: false,
     });
   };
   ```

## VSCode Debug Panel Features

### Debug Actions:
- **Continue (F5)** - Resume execution
- **Step Over (F10)** - Step over current line
- **Step Into (F11)** - Step into function
- **Step Out (Shift+F11)** - Step out of function
- **Restart (Ctrl+Shift+F5)** - Restart debugging
- **Stop (Shift+F5)** - Stop debugging

### Debug Views:
- **Variables** - View local and global variables
- **Watch** - Monitor specific expressions
- **Call Stack** - View execution stack
- **Breakpoints** - Manage all breakpoints
- **Loaded Scripts** - View loaded source files

## Environment-Specific Debugging

### Development Mode
- Source maps enabled
- Detailed error messages
- Fast refresh for client components
- Access to React DevTools in browser

### Production Mode
- Use `npm run build` then `npm run start:debug`
- Debug optimized production code
- Test production authentication flow

## Troubleshooting

### Common Issues:

1. **Breakpoints not hitting**
   - Ensure source maps are enabled
   - Check file is being served from correct location
   - Restart debug session

2. **Edge browser not launching**
   - Ensure Microsoft Edge is installed
   - Check firewall settings
   - Try Chrome configuration instead

3. **Server not starting**
   - Check port 3000 is available
   - Verify `npm run dev` works in terminal
   - Check for syntax errors

4. **Authentication debugging issues**
   - Check `.env.local` is properly configured
   - Verify GitHub OAuth app settings
   - Clear browser cookies and restart

### Debug Commands:
```bash
# Check if ports are available
netstat -ano | findstr :3000
netstat -ano | findstr :9222
netstat -ano | findstr :9229

# Kill processes on specific ports
taskkill /PID [PID] /F

# Clear browser debugging profiles
rm -rf .vscode/edge-debug-profile
rm -rf .vscode/chrome-debug-profile
```

## Advanced Debugging

### 1. **Network Requests**
- Use Edge/Chrome DevTools Network tab
- Monitor API requests and responses
- Debug fetch calls in `lib/post.ts` and `lib/post-client.ts`

### 2. **React DevTools**
- Install React DevTools extension for Edge/Chrome
- Inspect component hierarchy
- Monitor props and state changes

### 3. **Performance Profiling**
- Use Edge/Chrome Performance tab
- Profile client-side rendering
- Identify performance bottlenecks

### 4. **Memory Debugging**
- Use Edge/Chrome Memory tab
- Track memory leaks
- Monitor component lifecycle

## Debugging Scripts

### Package.json Scripts:
```bash
# Development with debugging
npm run dev:debug      # Start with Node inspector
npm run dev:debug-brk  # Start with breakpoint

# Production debugging
npm run start:debug    # Debug production build

# Edge-specific
npm run dev:edge       # Standard dev for Edge debugging
```

## Tips and Best Practices

1. **Start Simple**
   - Begin with browser-only debugging
   - Add server debugging as needed
   - Use console.log for quick verification

2. **Isolate Issues**
   - Debug one component at a time
   - Test authentication flow separately
   - Verify API endpoints independently

3. **Use Conditional Breakpoints**
   ```typescript
   // Set conditional breakpoint
   if (error) {
     debugger; // Only breaks when error exists
   }
   ```

4. **Document Findings**
   - Note down error patterns
   - Document authentication flow issues
   - Track down component re-renders

5. **Clean Up**
   - Remove debugger statements before committing
   - Clean console.log statements
   - Reset debugging profiles regularly

## Resources

- [VSCode Debugging Documentation](https://code.visualstudio.com/docs/editor/debugging)
- [Next.js Debugging Guide](https://nextjs.org/docs/advanced-features/debugging)
- [Edge DevTools Documentation](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/)
- [React DevTools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)

Happy debugging!