import { Header } from "@/components/ui/header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-gray-50 to-white p-8 dark:from-gray-900 dark:to-black">
        <div className="max-w-4xl space-y-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Welcome to Next.js 16
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300">
            A modern application demonstrating OAuth 2.0 authentication with
            GitHub
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Public Content
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This home page and about page are accessible to everyone without
                authentication.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Visit About page →
              </Link>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Protected Content
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The Users module requires GitHub authentication. Sign in to
                access user data and features.
              </p>
              <Link
                href="/users"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Try accessing Users →
              </Link>
            </div>
          </div>

          <div className="mt-12 rounded-xl bg-gray-100 p-8 dark:bg-gray-800">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Authentication Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    ✓
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  OAuth 2.0
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  GitHub authentication
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    🔒
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Route Protection
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Middleware-based security
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    ⚡
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  SSR Ready
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Server-side rendering
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>
              This application uses NextAuth.js (Auth.js) for authentication
              with GitHub OAuth. The middleware protects specific routes based
              on authentication status.
            </p>
          </div>

          <div className="mt-12 rounded-xl border border-gray-200 p-6 dark:border-gray-800">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Debugging Features
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This application includes comprehensive debugging setup for VSCode
              with Microsoft Edge. Press F5 to start debugging or use the debug
              configurations in the Run and Debug panel.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Available Debug Configurations:
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-blue-500"></span>
                    <strong>Next.js: Edge Browser</strong> - Client-side
                    debugging
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-green-500"></span>
                    <strong>Next.js: Debug Server</strong> - Server-side
                    debugging
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-purple-500"></span>
                    <strong>Next.js: Full Stack Debug</strong> - Complete
                    debugging
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-yellow-500"></span>
                    <strong>Next.js: Attach to Server</strong> - Attach to
                    running server
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Debug Tips:
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-blue-500"></span>
                    Set breakpoints by clicking next to line numbers
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-green-500"></span>
                    Use F10 to step over, F11 to step into code
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-purple-500"></span>
                    Check Variables panel to inspect state
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-yellow-500"></span>
                    Debug authentication flow in middleware and auth files
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                See{" "}
                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  DEBUGGING.md
                </code>{" "}
                for complete documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
