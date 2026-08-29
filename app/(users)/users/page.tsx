import { getPosts } from "@/lib/post";
import { CommentSection } from "@/components/ui/comment-section";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default async function UsersPage() {
  // Server-side data fetching
  const posts: Post[] = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        This page demonstrates server-side rendering with a client-side comment
        component.
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
      </div>
    </div>
  );
}
