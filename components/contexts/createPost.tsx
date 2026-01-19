"use client"

import { createContext, Dispatch, useState } from "react"
import { CreatePostModal } from "../modals/createPost";

type CreatePostType = {
    state: boolean,
    setState: Dispatch<React.SetStateAction<boolean>>
}

export const CreatePostContext = createContext<CreatePostType | null>(null);

export function PostContext({children} : {children: React.ReactNode}){
    const [state, setState] = useState<boolean>(false);
    
    return (
        <CreatePostContext.Provider value={{state, setState}}>
            <>
                {children} {state && <CreatePostModal setState={setState} />}
            </>
        </CreatePostContext.Provider>
    )
}