"use client"

import { CheckFollower } from "@/lib/actions/post/checkFollower"
import { X } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { Dispatch, useEffect, useState } from "react"
import { CreateResponse } from "../forms/createResponse"
import { Post, Response } from "@/lib/types/post"
import { Response as ResponesComponent } from "../response/response"

export  function ViewPostModal({
    post,
    setPost
} : {
    post: Post,
    setPost: Dispatch<React.SetStateAction<Post | null>> 
}){
    const [messages, setMessages] = useState<Response[]>(post.responses)
    const [isFollower,setIsFollower] = useState(false);

    const {data: session} = useSession();
    if(!session?.user) return null;

    useEffect(() => {
        const isFollower = async() => {
            const result = await CheckFollower({followers: post.author.followers});
            setIsFollower(result);
        }

        isFollower();
    },[])

    return (

        <div className={`w-full h-full backdrop-blur-[1px] bg-[rgba(0,0,0,0.3)] z-999 absolute top-0 left-0 
        flex justify-center items-center p-[1%]`}>
            <div className="bg-(--modal-post-background) w-290 h-160 rounded-md relative flex">
                <X
                    size={27} 
                    className="absolute top-3 right-3 cursor-pointer"
                    onClick={() => setPost(null)} />

                <div className="w-200 h-full relative flex items-center justify-center bg-black">
                    {
                        post.visualType.startsWith("video/")
                            ? <video
                                src={post.visual}
                                playsInline
                                controls
                                autoPlay
                                preload="metadata"
                                className="w-full  object-contain" />
    
                            : <Image
                                src={post.visual} 
                                alt={"post image"} 
                                fill
                                loading="eager"
                                className="object-contain" />
                    }
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex h-20 items-center px-4 gap-3 border-b border-(--modal-border-b)">
                        <Image 
                            className="rounded-full"
                            src={post.author.image ?? "/generals/profile.svg"}
                            alt={"author picture"} 
                            width={45} 
                            height={45} />

                        <h1 className="text-sm">{post.author.username ?? "Matheus Felipe"}</h1>

                        <button className={`ml-4 text-[13px] px-3 py-1 bg-linear-to-r from-[#512da8] to-[#6236c8] 
                        rounded-md cursor-pointer`}>
                            {isFollower ? "Following" : "Follow"} 
                        </button>
                    </div>

                    <div className="text-xs p-4 h-[75%] flex flex-col gap-8 overflow-auto">
                        {
                            messages.length === 0 
                                ? "No Comments yet."
                                
                                : messages.map((response) => (
                                    <ResponesComponent response={response} key={response.id} /> ))
                                
                        }
                    </div>
                    
                    <div className="flex gap-2 items-center px-3 flex-1 border-t border-(--modal-border-b)">
                        <Image 
                            className="rounded-full"
                            src={session?.user.image ?? "/generals/profile.svg"}
                            alt={"author picture"} 
                            width={40} 
                            height={40} />

                        <CreateResponse post={post} setMessages={setMessages} />
                    </div>
                </div>
            </div>
        </div>
    )
}