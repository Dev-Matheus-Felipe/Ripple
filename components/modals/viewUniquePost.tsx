"use client"
import { Post, Response } from "@/lib/types/post";
import Image from "next/image";
import { useState } from "react";
import { Session } from "next-auth";
import { CreateResponse } from "../forms/createResponse";
import { Response  as ResponsesComponent} from "../response/response";

export function ViewUniquePost({post, session} : {post: Post, session: Session}){
    const [messages, setMessages] = useState<Response[]>(post.responses)
    const [isFollower, setIsFollower] = useState(false);

    
    return (
        <div className="flex-1 flex flex-col">
            <div className="flex h-20 items-center mx-3 gap-3 border-b border-(--modal-border-b)">
                <Image
                    className="rounded-full w-10 h-10 object-cover object-center"
                    src={post.author.image ?? "/generals/profile.svg"}
                    alt={"author picture"} 
                    width={40} 
                    height={40} />

                <h1 className="text-sm">{post.author.username ?? "Undefined User"}</h1>

                {
                    session?.user?.id !== post.authorId && 
                        <button className={`text-[13px] px-3 py-1 bg-linear-to-r from-[#512da8] to-[#6236c8] 
                        rounded-md cursor-pointer text-white`}>
                            {isFollower ? "Following" : "Follow"} 
                        </button>
                }
            </div>

            <div className="text-xs p-4 h-[75%] flex flex-col gap-8 overflow-auto">
                {
                    post.responses.length === 0 
                        ? "No Comments yet."
                        
                        : messages.map((response) => (
                            <ResponsesComponent
                                response={response} 
                                key={response.id} 
                                setMessages={setMessages}
                                userId={session.user?.id} /> ))
                        
                }
            </div>
            
            <div className="flex gap-2 items-center mx-3 flex-1 border-t border-(--modal-border-b)">
                <Image 
                    className="rounded-full w-10 h-10 object-cover object-center"
                    src={session.user?.image ?? "/generals/profile.svg"}
                    alt={"author picture"} 
                    width={40} 
                    height={40} />

                <CreateResponse post={post} setMessages={setMessages} />
            </div>
        </div>
    )
}