import 'server-only'

export async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: {
      revalidate: 3600, // Revalidate every hour
    },
  })

  return res.json()
}

export async function getPostById(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: {
      revalidate: 3600,
    },
  })
  
  return res.json()
}