"use server"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Response } from "@/lib/types/post";

export async function ToLikeResponse({response} : {response: Response}){
    const session = await auth();

    if(!session?.user || !session.user.id) throw Error("Not authenticated");

    const validatedResponse = await prisma.response.findUnique({
        where: {id: response.id},
        select: {
            id: true,
            likes: true
        }
    })

    if(!validatedResponse) throw Error("Response not found");

    try{
        const isLiked = validatedResponse.likes.includes(session.user.id);

        await prisma.response.update({
            where: {id: validatedResponse.id},
            data: {
                likes: isLiked
                    ? {set: validatedResponse.likes.filter(userId => userId !== session.user?.id)}
                    : {push: session.user.id}
            }
        })

        return isLiked;
    }catch{
        throw Error("Internal database error");
    }

}