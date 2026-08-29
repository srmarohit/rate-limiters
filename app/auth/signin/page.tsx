"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleGitHubSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await signIn("github", {
        callbackUrl,
        redirect: false,
      });

      console.log("result >> ", result, callbackUrl);

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push(result?.url);
        router.refresh();
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Access protected users module
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                  Sign in failed
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleGitHubSignIn}
            disabled={isLoading}
            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-gray-800 px-4 py-3 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <div className="flex items-center">
              {isLoading ? (
                <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                <svg
                  className="mr-3 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              Sign in with GitHub
            </div>
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have a GitHub account?{" "}
              <a
                href="https://github.com/join"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Create one
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
