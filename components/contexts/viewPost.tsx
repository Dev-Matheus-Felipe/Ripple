"use client"

import { HomePosts } from "@/lib/actions/post/getPosts";
import { createContext, Dispatch, useState } from "react"
import { ViewPostModal } from "../modals/viewPost";

type ViewPostType = {
    state: HomePosts | null,
    setState: Dispatch<React.SetStateAction<HomePosts | null>>
}

export const CreateViewContext = createContext<ViewPostType | null>(null);

export function ViewPostContext({children} : {children: React.ReactNode}){
    const [state, setState] = useState<HomePosts | null>(null);

    return (
        <CreateViewContext.Provider value={{state, setState}}>
            {children} {state && <ViewPostModal state={state} setState={setState} /> }
        </CreateViewContext.Provider>
    )
}