"use client"

import React, { createContext, Dispatch, useEffect, useState } from "react"
import { Post } from "@/lib/types/post";
import { ViewPostModal } from "../modals/viewPost";
import { SessionProvider } from "next-auth/react";


type ViewPostType = {
    state: HomePostsType,
    setState: Dispatch<React.SetStateAction<HomePostsType>>
}


export type HomePostsType = {
    posts: Post[],
    currentPost: string | null
}

export const CreatePostViewContext = createContext<ViewPostType | null>(null);

export function PostViewContext({children} : {children: React.ReactNode}){
    const [state, setState] = useState<HomePostsType>({
        posts: [],
        currentPost: null
    }); 


    return (
        <CreatePostViewContext.Provider value={{state, setState}}>

            {children}  

            <SessionProvider>
                    {state.currentPost && <ViewPostModal postId={state.currentPost} />}
            </SessionProvider>
        </CreatePostViewContext.Provider>
    )
}