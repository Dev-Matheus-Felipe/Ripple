"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function ToLike({ id }: { id: string }) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const userId = session.user.id

  const post = await prisma.post.findUnique({
    where: { id },
    select: { likes: true },
  })

  if (!post) throw new Error("Post not found")

  const hasLiked = post.likes.includes(userId)

  await prisma.post.update({
    where: { id },
    data: {
      likes: hasLiked
        ? { set: post.likes.filter(id => id !== userId) }
        : { push: userId }
    }
  })

  return !hasLiked
}
