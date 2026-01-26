"use client"

import { CheckFollower } from "@/lib/actions/post/checkFollower"
import { X } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { CreateResponse } from "../forms/createResponse"
import { Response as ResponesComponent } from "../response/response"
import { useRouter } from "next/navigation"
import { Post, Response } from "@/lib/types/post"

export function ViewPostModal({ post }: { post: Post }) {
    const { data: session } = useSession();
    const router = useRouter();

    const [messages, setMessages] = useState<Response[]>(post.responses);
    const [isFollower, setIsFollower] = useState(false);

    useEffect(() => {
        if (!post) return

        const run = async () => {
            const result = await CheckFollower({
                followers: post.author.followers
            })
            setIsFollower(result)
        }

        run()
    }, [post])

    if (!session?.user ) return null


    return (

        <div className={`w-screen h-screen backdrop-blur-[1px] bg-[rgba(0,0,0,0.3)] z-999 absolute top-0 left-0`}>
            <div className={`bg-(--modal-post-background) max-w-290 h-160 rounded-md absolute top-1/2 left-1/2 -translate-1/2 flex`}>
                <X
                    size={25} 
                    className="absolute top-3 right-3 cursor-pointer"
                    onClick={() => router.back()} />

                <div className={`${post.sizeX < post.sizeY ? "min-w-130 max-w-200" : "w-200"}
                h-full relative flex items-center justify-center bg-black rounded-l-md`}>
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
                    <div className="flex h-20 items-center px-4 gap-3 border-b border-(--modal-border-b) rounded-t-md">
                        <Image 
                            className="rounded-full w-10 h-10 object-cover object-center"
                            src={post.author.image ?? "/generals/profile.svg"}
                            alt={"author picture"} 
                            width={40} 
                            height={40} />

                        <h1 className="text-sm">{post.author.username ?? "Undefined User"}</h1>

                        {
                            session.user.id !== post.authorId && 
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
                                    <ResponesComponent 
                                        response={response} 
                                        key={response.id} 
                                        setMessages={setMessages}
                                        userId={session.user?.id} /> ))
                                
                        }
                    </div>
                    
                    <div className="flex gap-2 items-center px-3 flex-1 border-t border-(--modal-border-b)">
                        <Image 
                            className="rounded-full w-10 h-9 object-cover object-center"
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