"use server"

import { auth } from "@/lib/auth"

export async function CheckFollower({followers} : {followers : string[]}){
    const session = await auth();

    if(!session?.user || !session.user.id) throw Error("Not auhtenticated");

    return (followers.includes(session.user.id)) ? true : false;
}