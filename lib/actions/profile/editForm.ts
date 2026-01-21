"use server"

import { EditFormPayload } from "@/components/profile/editForm";
import { EditFormPayloadSchema } from "./zodEditform";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";


export async function EditFormAction({data} : {data: EditFormPayload}){
    const session = await auth();
    if(!session?.user?.id) return {state: false, message: "Not authenticated"};

    const validatedData = EditFormPayloadSchema.safeParse(data);

    if(validatedData.error) return {state: false, message: validatedData.error.message};
    

    try{
        await prisma.user.update({
            where: {id: session.user.id},
            data: {...validatedData.data}
        })

        return {state: true, message: "Saved sucessuflly"};

    }catch{
        return {state: false, message: "Interal Database error"};
    }
}