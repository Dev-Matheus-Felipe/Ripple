"use client"

import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CreateViewContext } from "../contexts/viewPost";
import { GetPostTime } from "@/lib/actions/post/getPostTime";
import { PostToLike } from "@/lib/actions/post/postToLike";
import { Post } from "@/lib/types/post";
import Image from "next/image";
import { useSession } from "next-auth/react";

export function PostComponent({post} : {post: Post}){
    const [likeState, setLikeState] = useState({state: false, likes: post.likes.length});
    const {data: session} = useSession();

    const ctx = useContext(CreateViewContext);
    if(!ctx) return null;

    const {setState} = ctx;

    const postDate = GetPostTime({createdAt: post.createdAt});

    const likeHandler = async () => {
        const hasLiked = await PostToLike({postId: post.id})

        setLikeState(prev => ({
            state: hasLiked,
            likes: hasLiked ? prev.likes + 1 : prev.likes - 1
        }))
    }


    useEffect(()=>{
        const isLiked = () => {
            if(!session?.user || !session.user.id) return;
            const hasLiked = post.likes.includes(session.user.id) ? true : false;
            setLikeState(prev => ({...prev, state: hasLiked}));
        }

        isLiked();
    },[session, post.likes])

    return (
        <div className="flex flex-col pt-10 gap-3">
            <div className="w-full flex items-center h-6 gap-2">
                <Image 
                    className="rounded-full"
                    src={post.author.image ?? "/generals/profile.svg"}
                    alt={"author picture"} 
                    width={30} 
                    height={30} />
                
                <h1 className="text-sm font-medium h-5">{post.author.username ?? "Matheus Felipe"}</h1>
                <p className="text-xs h-5 flex items-end gap-2">
                    • {postDate}
                </p>
            </div>

            <button className={`w-120 min-h-70 max-h-140 relative rounded-md border border-[#3a3a3a] flex items-center 
            justify-center cursor-pointer`} onClick={() => setState(post)}>
                
                {
                    post.visualType.startsWith("video/")
                        ? <video
                            src={post.visual}
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-contain" />

                        : <Image 
                            src={post.visual} 
                            alt={"post image"} 
                            width={post.sizeX} 
                            height={post.sizeY} 
                            loading="eager" />
                }
                
            </button>

            <div className="flex justify-between pt-2">
                <div className="flex gap-1 items-center">
                        <Heart size={22} className="cursor-pointer" 
                        fill={likeState.state ? "var(--text-primary-color)" : ""}  onClick={() => likeHandler()} />
                        <p className="pr-2">{likeState.likes}</p>

                        <MessageCircle size={18} />
                        <p className="pr-5">{post.responses.length}</p>

                        <Send size={18} className="cursor-pointer" />
                </div>

                <Bookmark size={18} className="cursor-pointer" />
            </div>

            <div className="flex justify-between pt-1">
                <p className="text-[10px]">{post.description}</p>
                
                <div className="flex gap-2 text-xs text-[#6236c8]">
                    {
                        post.tags.map((tag: string, index: number) => (
                            <p key={index}>#{tag}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}