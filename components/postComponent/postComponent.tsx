"use client"

import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { Dispatch } from "react";
import { GetPostTime } from "@/lib/actions/post/getPostTime";
import { PostToLike } from "@/lib/actions/post/postToLike";
import { Post } from "@/lib/types/post";
import Image from "next/image";
import { HomePostsType } from "../contexts/viewPost";

export function PostComponent({
    post, 
    setState,
    userId
} : {
    post: Post, 
    setState: Dispatch<React.SetStateAction<HomePostsType>>,
    userId: string | undefined
}){

    const isLiked = !!userId && post.likes.includes(userId);
    const postDate = GetPostTime({createdAt: post.createdAt});

    const likeHandler = async () => {
        if (!userId) return;

        const hasLiked = await PostToLike({ postId: post.id });

        setState(prev => ({
            ...prev,
            posts: prev.posts.map(p => {
                if (p.id !== post.id) return p;

                return {
                    ...p,
                    likes: hasLiked
                        ? p.likes.filter(id => id !== userId)
                        : [...p.likes, userId]
                };
            })
        }));
    };


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
            justify-center cursor-pointer`} onClick={() => setState(prev => ({...prev, currentPost: post.id}))}>
                
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
                        fill={isLiked ? "var(--text-primary-color)" : ""}  onClick={() => likeHandler()} />
                        <p className="pr-2">{post.likes.length}</p>

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