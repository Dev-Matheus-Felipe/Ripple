import { ConversationsType } from "@/lib/actions/messages/getInitialMessages";
import Image from "next/image";
import { UserFoundType } from "./messagesComponent";
import { User } from "next-auth";
import { Dispatch } from "react";
import { NewConversation } from "@/lib/actions/messages/newConversation";
import Link from "next/link";

export function UsersContainer({
    conversations,
    setCurrentConversation,
    userSearch,
    user
} : {
    conversations: ConversationsType[],
    setCurrentConversation: Dispatch<React.SetStateAction<ConversationsType | null>>,
    userSearch: {search: string, user: UserFoundType[] | null},
    user: User
}){


    return (
        <>
            {
                userSearch.search.length === 0
                    ? <div className="w-full flex flex-col mt-10 font-bold">
                        <h1 className="mb-4">Messages</h1>

                        <div className="flex flex-col overflow-auto gap-3">
                            {
                                conversations.length > 0 
                                    ? conversations.map(c => {
                                        const userMessage = c.userAId === user.id ? c.userB : c.userA;

                                        return (
                                            <Link  href={`/messages/${c.id}`}
                                                className="w-full h-10 flex items-center cursor-pointer gap-3" 
                                             
                                                key={c.id}>

                                                <Image 
                                                    src={userMessage.image ?? "/generals/profile.svg"} 
                                                    alt={"User Image"} 
                                                    width={40} 
                                                    height={40} 
                                                    className="rounded-full min-w-10 max-w-10 h-10 object-cover object-center" />

                                                <div className="w-full h-full">
                                                    <p className="font-bold text-sm">{userMessage.name}</p>
                                                    <p className="font-normal text-xs">{userMessage.username}</p>
                                                </div>
                                            </Link>
                                        )
                                    })
                                
                                : <p className="mt-5 font-normal text-sm">No conversations found...</p>
                            }
                        </div>
                    </div>

                    : <div className="max-h-screen overflow-y-auto py-5">
                        {
                            userSearch.user?.map(e => (
                                <div 
                                    className="w-full h-15 flex items-center cursor-pointer gap-3" 
                                 
                                    key={e.username}>

                                    <Image 
                                        src={e.image ?? "/generals/profile.svg"} 
                                        alt={"User Image"} 
                                        width={48} 
                                        height={48} 
                                        className="rounded-full min-w-12  h-12 object-cover object-center" />

                                    <div className="w-full">
                                        <p className="text-sm font-bold">{e.name}</p>
                                        <p className="text-xs">{e.username}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
        </>
    )
}