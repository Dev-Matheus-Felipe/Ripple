"use client"

import { MyProfileData, Post, SavedPost } from "@/lib/types/myProfileData";
import { Bookmark, Clapperboard, Film, Grid3X3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type PostsState = {
    status: "posts" | "savedPosts" | "videos",
    posts: Post[]
}

const iconStyle = "border-b-2 w-12 flex justify-center";
const visualStyle = "cursor-pointer max-w-60 max-h-100";

export function PostsProfile({userData} : {userData: MyProfileData}){
    const [posts, setPosts] = useState<PostsState>({
        status: "posts", 
        posts: userData.posts.filter(p => p.visualType.startsWith("image/") )
    });

    const postHandler = (status: "posts" | "savedPosts" | "videos") => {
        let posts: Post[]

        if (status === "savedPosts") {
            posts = userData.savedPosts.map(sp => sp.post)

        } else if (status === "videos") {
            posts = userData.posts.filter(p =>
                p.visualType.startsWith("video/") )

        } else {
            posts = userData.posts.filter(p =>
                p.visualType.startsWith("image/") )
        }

        setPosts({ status, posts })
    }



    return (
        <div className="w-full flex flex-col">
            <div className="border-b b500:mt-25 mt-15 border-(--modal-border-b) w-full h-10 flex justify-around">
                <div className={`${iconStyle} ${posts.status !== "posts" && "border-transparent"}`}>
                    <Grid3X3 
                        size={26} 
                        className="cursor-pointer"
                        color={`${posts.status === "posts" ? "var(--text-primary-color)" : "var(--primary-color)"}`}
                        onClick={()=> postHandler("posts")}  />
                </div>

                <div className={`${iconStyle} ${posts.status !== "savedPosts" && "border-transparent"}`}>
                    <Film 
                        size={26} 
                        color={`${posts.status === "savedPosts" ? "var(--text-primary-color)" : "var(--primary-color)"}`}
                        className="cursor-pointer"
                        onClick={()=> postHandler("savedPosts")}  />
                </div>
                
                <div className={`${iconStyle} ${posts.status !== "videos" && "border-transparent"}`}>
                    <Bookmark  
                        size={26} 
                        className="cursor-pointer"
                        color={`${posts.status === "videos" ? "var(--text-primary-color)" : "var(--primary-color)"}`}
                        onClick={()=> postHandler("videos")}  />
                </div>
            </div>

            <div className="flex mt-3">
                {posts.posts.map( post => (
                    <Link href={`/p/${post.id}`} key={post.id}>
                        {
                            post.visualType.startsWith("video/") 
                                ? <div>
                                    <Clapperboard 
                                        size={23} 
                                        className="absolute top-4 right-4" 
                                        color="white" />

                                    <video
                                        src={post.visual}
                                        playsInline
                                        preload="metadata"
                                        className={visualStyle} />
                                </div>

                                : <Image 
                                    src={post.visual} 
                                    alt={"post image"} 
                                    width={400} 
                                    height={200} 
                                    loading="eager"
                                    key={post.id}
                                    className={visualStyle} />
                                
                        }
                    </Link>
                ))}
            </div>
        </div>
    )
}