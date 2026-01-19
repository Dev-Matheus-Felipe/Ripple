"use server"

import { prisma } from "@/lib/prisma";
import { Post } from "@/lib/types/post";

export async function GetPosts(cursor?: string){
    try{
      const posts: Post[] = await prisma.post.findMany({
        take: 7,
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
    }catch(err) {
      console.log(err)
      return []
    }
}

export async function GetUniquePost({id} : {id: string}){
    const post: Post | null = await prisma.post.findUnique({
        where: {id: id},

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