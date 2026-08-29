"use client";

import { useState, useEffect } from "react";
import { getPostComments } from "@/lib/post-client";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  async function fetchComments() {
    try {
      setLoading(true);
      setError(null);
      const data = await getPostComments(postId);
      setComments(data);
    } catch (err) {
      setError("Failed to load comments");
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleAddComment = () => {
    const newComment: Comment = {
      id: comments.length + 1,
      name: "User",
      email: "user@example.com",
      body: "This is a new comment added dynamically!",
      postId: parseInt(postId),
    };

    setComments([newComment, ...comments]);
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setShowComments(!showComments)}
        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors mb-4"
      >
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && (
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-4">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Loading comments...
              </p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-400">{error}</p>
              <button
                onClick={fetchComments}
                className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                Try again
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Comments ({comments.length})
                </h3>
                <button
                  onClick={handleAddComment}
                  className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                >
                  Add Comment
                </button>
              </div>

              <div className="space-y-3">
                {comments.slice(0, 3).map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{comment.name}</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {comment.email}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {comment.body}
                    </p>
                  </div>
                ))}

                {comments.length > 3 && (
                  <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                    + {comments.length - 3} more comments
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
