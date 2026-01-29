    "use server"

    import { prisma } from "@/lib/prisma";
    import { User } from "next-auth";
import { ConversationsType } from "./getInitialMessages";

    export async function NewConversation({userA, userBUsername} : {userA: User, userBUsername: string | null}){
        const userB = await prisma.user.findUnique({where: {username: userBUsername ?? ""}})

        if(!userA.id || !userB?.id) throw Error("Users not found");

        const conversationExists = await prisma.conversation.findFirst({
            where: {
                OR: [
                    {
                        userAId: userA.id,
                        userBId: userB.id,
                    },
                    {
                        userAId: userB.id,
                        userBId: userA.id,
                    },
                ],
            },

            include: {
                userA: {
                    select: {
                        image: true,
                        name: true,
                        username: true
                    }
                },

                userB: {
                    select: {
                        image: true,
                        name: true,
                        username: true
                    }
                },

                messages: true
            }
        })

        if(conversationExists) return conversationExists;

        try{
            const NewConversation = await prisma.conversation.create({
                data: {
                userAId: userA.id,
                userBId: userB.id
                }
            })

            const conversationSettled: ConversationsType | null = await prisma.conversation.findUnique({
                where: {id: NewConversation.id},
                include: {
                    userA: {
                        select: {
                            image: true,
                            name: true,
                            username: true
                        }
                    },

                    userB: {
                        select: {
                            image: true,
                            name: true,
                            username: true
                        }
                    },

                    messages: true
                }
            })
            return conversationSettled;
        }catch{
            throw Error("Interal database Error");
        }
    }