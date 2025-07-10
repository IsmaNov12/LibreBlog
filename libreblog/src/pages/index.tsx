import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  slug: string
  createdat: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function loadPosts() {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data)
    }
    loadPosts()
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">LibreBlog</h1>
      {posts.length === 0 && <p>No hay publicaciones todavía.</p>}
      <ul>
        {posts.map(post => (
          <li key={post.id} className="mb-4">
            <Link href={`/post/${post.slug}`} className="text-blue-600 hover:underline">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p className="text-gray-500 text-sm">
              Publicado el {new Date(post.createdat).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
