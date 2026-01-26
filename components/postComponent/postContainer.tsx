"use client"

import { GetPosts } from "@/lib/actions/post/getPosts";
import { useContext, useEffect } from "react";
import { useOnInView } from "react-intersection-observer";
import { PostComponent } from "./postComponent";
import { Post } from "@/lib/types/post";
import { CreatePostViewContext } from "../contexts/viewPost";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase/client"

export function PostContainer({initialPosts} : {initialPosts: Post[]}){

    const ctx = useContext(CreatePostViewContext);
    if(!ctx) return null;

    const {data: session} = useSession();
    const {state, setState} = ctx;

    const trackingRef = useOnInView(
        async(inView, entry) => {
            if (inView) {
                const lastPost = state.posts.at(-1);
                if (!lastPost || state.posts.length % 5 === 0) return;

                const newPosts = await GetPosts(lastPost.id);
                setState(prev => ({...prev, posts: [...prev.posts, ...newPosts]}));
            }
        },
        {
            threshold: 0.5,
            triggerOnce: true,
        },
    );

    useEffect(()=>{
        setState(prev => ({...prev, posts: initialPosts}));
    },[])


    useEffect(() => {
        const channel = supabase
            .channel("post")
            .on("broadcast", { event: "new-message" }, ({ payload }) => {
            setState(prev => ({
                ...prev,
                posts: [...prev.posts, payload],
            }))
            })

        channel.subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])



    return (
        <>
            <div className="w-full h-full  flex flex-col gap-5 items-center">
                <div className="flex flex-col gap-10 min-h-full pb-5">
                    {
                        state.posts.map( post => (
                            <PostComponent post={post} setState={setState} userId={session?.user?.id} key={post.id} /> )) }
                </div>
                <div className="w-5 h-5 bg-white" ref={trackingRef}/> 
            </div>        
        </>
    )
}