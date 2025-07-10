import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
}

export default function PostPage() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    async function loadPost() {
      setLoading(true)
      try {
        const res = await fetch(`/api/posts/${slug}`)
        if (!res.ok) throw new Error('Post no encontrado')
        const data = await res.json()
        setPost(data)
      } catch (err) {
        console.error(err)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [slug])

  if (loading) return <p>Cargando...</p>
  if (!post) return <p>No se encontró el post.</p>

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-4">
        Publicado el {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div>{post.content}</div>
    </div>
  )
}

