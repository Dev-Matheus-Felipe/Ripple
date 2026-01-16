"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PostToLike({ postId }: { postId: string }) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const userId = session.user.id

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { likes: true },
  })

  if (!post) throw new Error("Post not found")

  const hasLiked = post.likes.includes(userId)

  await prisma.post.update({
    where: { id: postId },
    data: {
      likes: hasLiked
        ? { set: post.likes.filter(id => id !== userId) }
        : { push: userId }
    }
  })

  return !hasLiked
}
