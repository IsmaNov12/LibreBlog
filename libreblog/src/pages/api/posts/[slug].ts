import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query
  if (typeof slug !== 'string') return res.status(400).json({ message: 'Invalid slug' })

  try {
    const post = await prisma.post.findUnique({ where: { slug } })
    if (!post) return res.status(404).json({ message: 'Post not found' })

    // Convertimos createdAt a string ISO para evitar problemas en el frontend
    return res.status(200).json({
      ...post,
      createdAt: post.createdat.toISOString(),
    })
  } catch (error) {
    console.error('Error fetching post:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

