"use server"

import { prisma } from "@/lib/prisma"

export const FindUser = async({search} : {search: string}) => {
    if(search.length > 0){
        const userFound = await prisma.user.findMany({
            where: {
                username: {
                    contains:search,
                    mode: "insensitive"
                }
            },

            select: {
                name: true,
                username: true,
                image: true
            }
        })

        return userFound;
    }

    return null;
}