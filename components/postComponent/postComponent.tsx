"use client"

import { HomePosts } from "@/lib/actions/post/getPosts";
import { Bookmark, Circle, Heart, MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CreateViewContext } from "../contexts/viewPost";
import { GetPostTime } from "@/lib/getPostTime/getPostTIme";
import { CheckLiked } from "@/lib/actions/post/checkLiked";
import { ToLike } from "@/lib/actions/post/toLike";

export function PostComponent({post} : {post: HomePosts}){
    const [liked, setLiked] = useState({state: false, likes: post.likes.length});
    const ctx = useContext(CreateViewContext);
    if(!ctx) return null;

    const {state, setState} = ctx;

    const postDate = GetPostTime({createdAt: post.createdAt});

    const toLike = async () => {
        const hasLiked = await ToLike({ id: post.id })

        setLiked(prev => ({
            state: hasLiked,
            likes: hasLiked ? prev.likes + 1 : prev.likes - 1
        }))
    }


    useEffect(()=>{
        const isLiked = async() => {
            const hasLiked = await CheckLiked({likes: post.likes});
            setLiked(prev => ({...prev, state: hasLiked}));
        }

        isLiked();
    },[])

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
                <p className="text-xs h-5 flex items-end gap-2 pl-3">
                    <Circle size={7} className="mb-1"/>
                    {postDate}
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
                        fill={liked.state ? "var(--text-primary-color)" : ""}  onClick={() => toLike()} />
                        <p className="pr-2">{liked.likes}</p>

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
                        post.tags.map((tag, index) => (
                            <p key={index}>#{tag}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}