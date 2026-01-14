"use client"

import { Plus } from "lucide-react";
import { useContext } from "react";
import { CreatePostContext } from "../contexts/createPost";

export function CreatePostComponent({
    container_link,
    icon_size,
    container_button
} : {
    container_link: string,
    icon_size: number,
    container_button: () => string
}){
    const ctx = useContext(CreatePostContext);
    if(!ctx) return null;

    const {state, setState} = ctx;

    return (
        <button className={container_link} onClick={() => setState(prev => !prev)}>
            <div  className={container_button()}>
                <Plus size={icon_size}/>
            </div>

            <h1 className="min-w-15 h-5 text-(--primary-color) flex justify-start">To create</h1>
        </button>
    )
}