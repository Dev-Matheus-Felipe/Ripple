"use client"
import { Post } from "@/lib/types/post";
import Image from "next/image";
import { useContext, useState } from "react";
import { Response } from "../response/response";
import { Session } from "next-auth";
import { CreatePostViewContext } from "../contexts/viewPost";
import { CreateResponse } from "../forms/createResponse";

export function ViewUniquePost({post, session} : {post: Post, session: Session}){
    const [isFollower, setIsFollower] = useState(false);

    const ctx = useContext(CreatePostViewContext);
    if(!ctx) return null;

    const { setState } = ctx
    
    return (
        <div className="flex-1 flex flex-col">
            <div className="flex h-20 items-center mx-3 gap-3 border-b border-(--modal-border-b)">
                <Image
                    className="rounded-full"
                    src={post.author.image ?? "/generals/profile.svg"}
                    alt={"author picture"} 
                    width={45} 
                    height={45} />

                <h1 className="text-sm">{post.author.username ?? "Matheus Felipe"}</h1>

                <button className={`ml-4 text-[13px] px-3 py-1 bg-linear-to-r from-[#512da8] to-[#6236c8] text-white
                rounded-md cursor-pointer`}>
                    {isFollower ? "Following" : "Follow"} 
                </button>
            </div>

            <div className="text-xs p-4 h-[75%] flex flex-col gap-8 overflow-auto">
                {
                    post.responses.length === 0 
                        ? "No Comments yet."
                        
                        : post.responses.map((response) => (
                            <Response
                                response={response} 
                                key={response.id} 
                                setState={setState}
                                userId={session.user?.id} 
                                postId={post.id} /> ))
                        
                }
            </div>
            
            <div className="flex gap-2 items-center mx-3 flex-1 border-t border-(--modal-border-b)">
                <Image 
                    className="rounded-full"
                    src={session.user?.image ?? "/generals/profile.svg"}
                    alt={"author picture"} 
                    width={40} 
                    height={40} />

                <CreateResponse post={post} setState={setState} />
            </div>
        </div>
    )
}