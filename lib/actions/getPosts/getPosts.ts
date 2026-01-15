"use server"

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type HomePosts = Prisma.PostGetPayload<{
  include: {
    responses: true,
    
    author: {
      select: {
        username: true;
        image: true;
      };
    };
  };
}>;

export async function GetPosts(cursor?: string){
    const posts = await prisma.post.findMany({
        take: 5,
        ...(cursor && {
            cursor: { id: cursor },
            skip: 1,
        }),

        include: {
            responses: true,

            author: {
                select: {
                username: true,
                image: true
                }
            }
        }
    });

    return posts;
}