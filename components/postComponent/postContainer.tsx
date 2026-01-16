"use client"

import { GetPosts, HomePosts } from "@/lib/actions/post/getPosts";
import { useState } from "react";
import { useOnInView } from "react-intersection-observer";
import { PostComponent } from "./postComponent";

export function PostContainer({initialPosts} : {initialPosts: HomePosts[]}){
    const [posts, setPosts] = useState<HomePosts[]>([...initialPosts]);

    const trackingRef = useOnInView(
        async(inView, entry) => {
            if (inView) {
                const lastPost = posts.at(-1);
                if (!lastPost || posts.length % 5 === 0) return;

                const newPosts = await GetPosts(lastPost.id);
                setPosts(prev => ([...prev, ...newPosts]));
            }
        },
        {
            threshold: 0.5,
            triggerOnce: true,
        },
    );

    return (
        <div className="w-full h-full  flex flex-col gap-5 items-center">
            <div className="flex flex-col gap-10 min-h[100%] pb-5">
                {
                posts.map(post => (
                    <PostComponent post={post} key={post.id} />
                ))
                }
            </div>
            <div className="w-5 h-5 bg-white" ref={trackingRef}/>
        </div>
    )
}