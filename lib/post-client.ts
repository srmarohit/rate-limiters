// Client-compatible post functions
export async function getPostComments(postId: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
  
  if (!res.ok) {
    throw new Error('Failed to fetch comments');
  }
  
  return res.json();
}