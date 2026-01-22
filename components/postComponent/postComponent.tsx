"use client"

import { Bookmark, Clapperboard, Ellipsis, Heart, MessageCircle, Send } from "lucide-react";
import { Dispatch } from "react";
import { GetPostTime } from "@/lib/actions/post/getPostTime";
import { PostToLike } from "@/lib/actions/post/postToLike";
import { Post } from "@/lib/types/post";
import Image from "next/image";
import { HomePostsType } from "../contexts/viewPost";
import Link from "next/link";
import { DescriptionPost } from "./descriptionPost";

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
        <div className="flex flex-col gap-3 w-full md:pt-10 pt-4">
            <div className="w-full flex items-center h-6 gap-2 px-3 justify-between">
                <div className="flex items-center h-6 gap-2">
                    <Image 
                        className="rounded-full w-7.5 h-7.5 object-cover object-center"
                        src={post.author.image ?? "/generals/profile.svg"}
                        alt={"author picture"} 
                        width={30} 
                        height={30} 
                        />
                    
                    <h1 className="text-sm font-medium">{post.author.username ?? "Undefined User"}</h1>
                    <p className="text-xs gap-2">
                        • {postDate}
                    </p>
                </div>

                <Ellipsis size={20} className="cursor-pointer" />
            </div>

            <Link className={`max-w-120 min-h-70 max-h-140 relative rounded-md border border-[#3a3a3a] flex items-center 
            justify-center cursor-pointer`} href={`/p/${post.id}`}>
                
                {
                    post.visualType.startsWith("video/")
                        ? <>
                            <Clapperboard size={23} className="absolute top-4 right-4" color="white" />

                            <video
                                src={post.visual}
                                playsInline
                                preload="metadata"
                                className="w-full h-full object-contain" />
                            </>

                        : <Image 
                            src={post.visual} 
                            alt={"post image"} 
                            width={post.sizeX} 
                            height={post.sizeY} 
                            loading="eager"
                            className="w-full h-full object-contain" />
                }
                
            </Link>

            <div className="flex justify-between pt-1  px-4">
                <div className="flex gap-1 items-center">
                        <Heart 
                            size={25} 
                            className="cursor-pointer hover:stroke-red-500" 
                            fill={isLiked ? "red" : "transparent"} 
                            color={isLiked ? "red" : "var(--text-primary-color)"}  
                            onClick={() => likeHandler()} />
                            
                        <p className="pr-2">{post.likes.length}</p>

                        <MessageCircle size={20} />
                        <p className="pr-2">{post.responses.length}</p>

                        <Send size={20} className="cursor-pointer" />
                </div>

                <Bookmark size={20} className="cursor-pointer" />
            </div>

           <DescriptionPost description={post.description} tags={post.tags} />
        </div>
    )
}