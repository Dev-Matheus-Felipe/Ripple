"use client"

import { createContext, Dispatch, useState } from "react"
import { ViewPostModal } from "../modals/viewPost";
import { SessionProvider } from "next-auth/react";
import { Post } from "@/lib/types/post";

type ViewPostType = {
    state: Post | null,
    setState: Dispatch<React.SetStateAction<Post | null>>
}

export const CreateViewContext = createContext<ViewPostType | null>(null);

export function ViewPostContext({children} : {children: React.ReactNode}){
    const [state, setState] = useState<Post | null>(null);

    return (
        <CreateViewContext.Provider value={{state, setState}}>
            <SessionProvider>
                {children} {state && <ViewPostModal post={state} setPost={setState} /> }
            </SessionProvider>
        </CreateViewContext.Provider>
    )
}