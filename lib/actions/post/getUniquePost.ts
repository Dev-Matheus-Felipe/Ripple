"use server"

import { prisma } from "@/lib/prisma";
import { Post } from "@/lib/types/post";

export async function GetUniquePost({postId}: {postId: string}){
    const post: Post | null = await prisma.post.findUnique({
        where: {id: postId},
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

    return post;
}