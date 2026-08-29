import { auth } from "@/lib/auth";

export default async function TestAuthPage() {
  const session = await auth();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Authentication Test</h1>
      
      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Session Information</h2>
        
        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">Session exists:</p>
            <p className="text-lg font-bold">{session ? "Yes" : "No"}</p>
          </div>
          
          {session && (
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">User:</p>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
                {JSON.stringify(session.user, null, 2)}
              </pre>
            </div>
          )}
          
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">Environment Variables:</p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p>AUTH_GITHUB_ID: {process.env.AUTH_GITHUB_ID ? "Set" : "Not set"}</p>
              <p>AUTH_GITHUB_SECRET: {process.env.AUTH_GITHUB_SECRET ? "Set" : "Not set"}</p>
              <p>AUTH_SECRET: {process.env.AUTH_SECRET ? "Set" : "Not set"}</p>
              <p>NEXTAUTH_URL: {process.env.NEXTAUTH_URL}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Visit <a href="/users" className="text-blue-600 dark:text-blue-400">/users</a> to test middleware protection</li>
          <li>Check if you get redirected to signin page</li>
          <li>Sign in with GitHub</li>
          <li>Try accessing /users again</li>
          <li>Check this page to see session information</li>
        </ol>
      </div>
    </div>
  );
}