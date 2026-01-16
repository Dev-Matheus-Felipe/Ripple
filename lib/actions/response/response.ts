"use server"

import { responseSchema } from "./zodResponse"
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Response as ResponseType } from "@/lib/types/post";


type PromiseResponseType  = 
    | {state: false, message: string}
    | {state: true, newMessage: ResponseType}


export async function Response({response, postId} : {response: string, postId: string}): Promise<PromiseResponseType>{
    const validatedData = responseSchema.safeParse({response});

    if(validatedData.error) return {state: false, message: "Invalidated Data"};

    const session = await auth();

    if(!session?.user || !session.user.id) return {state: false, message: "Not authenticated"};

    try{
        const newMessage = await prisma.response.create({
            data: {
                content: validatedData.data.response,
                postId,
                authorId: session.user.id
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        image: true
                    }
                }
            }
        });

        return {state: true, newMessage: newMessage};

    }catch{
        return {state: false, message: "Internal Server Error"};
    }
}