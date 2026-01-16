"use server"

import { auth } from "@/lib/auth"

export async function CheckLiked({likes} : {likes: string[]}){
    const session = await auth();

    if(!session?.user || !session.user.id) return false;

    return likes.includes(session.user.id) ? true : false;
}