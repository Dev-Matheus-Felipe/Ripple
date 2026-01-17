"use client"

import { createContext, Dispatch, useEffect, useState } from "react"
import { ViewPostModal } from "../modals/viewPost";
import { SessionProvider } from "next-auth/react";
import { Post } from "@/lib/types/post";
import { GetUniquePost } from "@/lib/actions/post/getUniquePost";

type ViewPostType = {
    postId: string | null,
    setPostId: Dispatch<React.SetStateAction<string | null>>
}

export const CreateViewContext = createContext<ViewPostType | null>(null);

export function ViewPostContext({children} : {children: React.ReactNode}){
    const [postId, setPostId] = useState<string | null>(null);
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const postHandler = async() => {
            if(!postId) return;

            const newatualizatedPost = await GetUniquePost({postId: postId});
            setPost(newatualizatedPost);
        }

        postHandler();
    },[postId]);


    return (
        <CreateViewContext.Provider value={{postId, setPostId}}>
            <SessionProvider>
                {children} {(postId && post) && <ViewPostModal post={post} setPost={setPost} setPostId={setPostId} /> }
            </SessionProvider>
        </CreateViewContext.Provider>
    )
}