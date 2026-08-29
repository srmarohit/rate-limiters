import { getPosts } from "@/lib/post";
import { CommentSection } from "@/components/ui/comment-section";
import { Header } from "@/components/ui/header";
import { auth } from "@/lib/auth";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default async function UsersPage() {
  // Server-side data fetching
  const posts: Post[] = await getPosts();

  // Get the session on the server side
  const session = await auth();

  console.log("Session ", session);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Users Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Welcome, {session?.user?.name || session?.user?.email}! You have
            access to protected content.
          </p>
          <div className="inline-flex items-center rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
            <svg
              className="mr-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Authenticated with GitHub
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 mb-8 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Protected Content Access
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This page is only accessible to authenticated users. The data below
            is fetched server-side and includes interactive client-side
            components for comments.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6">Posts</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Server-side rendered posts with client-side comment functionality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 6).map((post) => (
            <div
              key={post.id}
              className="rounded-xl border border-gray-200 p-6 dark:border-gray-800 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                {post.body}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>User ID: {post.userId}</span>
                <span>Post ID: {post.id}</span>
              </div>

              {/* Client-side comment component */}
              <CommentSection postId={post.id.toString()} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          <p>
            Showing {Math.min(6, posts.length)} of {posts.length} posts
          </p>
          <p className="mt-2 text-sm">
            Only authenticated users can view this content
          </p>
        </div>
      </div>
    </>
  );
}
