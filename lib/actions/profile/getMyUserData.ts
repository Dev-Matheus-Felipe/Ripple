"use server"

import { prisma } from "@/lib/prisma"
import { MyProfileData } from "@/lib/types/myProfileData"

export async function GetMyUserData({ userId }: { userId: string }) {
  const userData: MyProfileData | null = await prisma.user.findUnique({
    where: { id: userId },

    select: {
      name: true,
      username: true,
      image: true,
      email: true,
      bio: true,
      followers: true,
      following: true,

      savedPosts: {
        include: {
          post: true, 
        },
      },

      posts: true
    
    },
  })

  return userData
}
