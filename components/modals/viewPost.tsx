"use client"

import { CheckFollower } from "@/lib/actions/post/checkFollower"
import { X } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { CreateResponse } from "../forms/createResponse"
import { Response } from "@/lib/types/post"
import { Response as ResponesComponent } from "../response/response"
import { CreatePostViewContext } from "../contexts/viewPost"

export  function ViewPostModal({postId} : {postId: string | null,}){

    const ctx = useContext(CreatePostViewContext);
    if (!ctx) return null;

    const { state, setState } = ctx;

    const post = state.posts.find(
        p => p.id === postId
    );

    if(!post) return null;

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
    
    useEffect(() => {
        setState(prev => (
            {
                ...prev,
                posts: prev.posts.map(e => {
                    if(e.id === post.id){
                        let newPost = {...e};
                        newPost.responses = messages;
                        return newPost;

                    }else 
                        return e
                })
            }
        ))
    },[messages])

    return (

        <div className={`w-full h-full backdrop-blur-[1px] bg-[rgba(0,0,0,0.3)] z-20 absolute top-0 left-0
        flex justify-center items-center p-[1%]`}>
            <div className="bg-(--modal-post-background) w-290 h-160 rounded-md relative flex">
                <X
                    size={27} 
                    className="absolute top-3 right-3 cursor-pointer"
                    onClick={() => setState(prev => ({...prev, currentPost: null})) } />

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
                            post.responses.length === 0 
                                ? "No Comments yet."
                                
                                : post.responses.map((response) => (
                                    <ResponesComponent 
                                        response={response} 
                                        key={response.id} 
                                        setState={setState}
                                        userId={session.user?.id} 
                                        postId={post.id} /> ))
                                
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