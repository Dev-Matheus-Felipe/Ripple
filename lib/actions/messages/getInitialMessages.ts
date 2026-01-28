"use server"

import { prisma } from "@/lib/prisma"

export type MessagesType = {
  id: string, 
  content: string,
  createdAt: Date,
  conversationId: string,
  senderId: string
}

export type ConversationsType = {
  id : string,
  userAId: string,
  userBId: string,
  createdAt: Date,

  userA: {
    image: string | null,
    name: string,
    username: string | null
  },

  userB: {
    image: string | null,
    name: string,
    username: string | null
  },

  messages: MessagesType[]

}

export const GetInitialMessages = async({userId} : {userId: string}) => {
    const initialMessages: ConversationsType[] = await prisma.conversation.findMany({
        where: {
            OR: [
                { userAId: userId},
                { userBId: userId}
            ]
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
    });

    return initialMessages;
}