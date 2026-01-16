"use server"

import { prisma } from "@/lib/prisma";
import { Post } from "@/lib/types/post";

export async function GetPosts(cursor?: string){
    const posts: Post[] = await prisma.post.findMany({
        take: 5,
        ...(cursor && {
            cursor: { id: cursor },
            skip: 1,
        }),

        include: {
            responses: {
              select: {
                id: true,
                content: true,
                createdAt: true,
                likes: true,
                postId: true,
                authorId: true,

                author: {
                  select: {
                    id: true,
                    username: true,
                    image: true
                  }
                }
              }
            },

            author: {
                select: {
                  username: true,
                  image: true,
                  followers: true
                }
            }
        }
    });

    return posts;
}