import { Header } from "@/components/ui/header";

export default function About() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          About This Application
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Authentication System
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This application implements OAuth 2.0 authentication using
                GitHub as the identity provider. The authentication system is
                built with NextAuth.js (Auth.js) and includes:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-blue-500"></span>
                  GitHub OAuth integration
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-blue-500"></span>
                  Route protection middleware
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-blue-500"></span>
                  Session management with JWT
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-blue-500"></span>
                  Protected and public route separation
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Public Access
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                This page and the home page are accessible to everyone without
                authentication. The content here provides information about the
                application and its features.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Technology Stack
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    Next.js
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    16.3.3
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    React
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    19.2.8
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    TypeScript
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    Latest
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    Tailwind CSS
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    v4
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    NextAuth.js
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    Auth.js v5
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Architecture
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The application follows modern Next.js patterns with a clear
                separation of concerns:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-green-500"></span>
                  Server Components for data fetching
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-green-500"></span>
                  Client Components for interactivity
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-green-500"></span>
                  API routes for authentication
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-green-500"></span>
                  Middleware for route protection
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            This is a demonstration application for OAuth 2.0 authentication in
            Next.js 16.
          </p>
        </div>
      </div>
    </>
  );
}
