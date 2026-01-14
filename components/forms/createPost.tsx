"use client"

import { NewPostAction } from "@/lib/actions/newPost/newPost";
import { uploadToSupabase } from "@/lib/actions/newPost/supabaseHandler";
import { PostSchema } from "@/lib/actions/newPost/zodPost";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form"

export type newPostType = {
    description: string,
    tags: string[],
}

export function CreatePostForm({preview} : {preview: {file: File, type: string}}){
    const initialValues: newPostType = {
        description: "",
        tags: [],
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        setValue
    } = useForm<newPostType>({
        defaultValues: initialValues,
        resolver: zodResolver(PostSchema) 
    });

    const [newTag, setNewTag] = useState("");
    const tags = watch("tags");

    const selectTag = () => {
        const regex = /^([a-zA-Z0-9]{3,})+(-[a-zA-Z0-9]+)*$/;

        if(tags.length > 2 || tags.includes(newTag) || !regex.test(newTag)) return;

        setValue("tags", [...tags, newTag]);
        setNewTag("");
    }

    async function newPostHandler(data: newPostType) {
        if (!preview.file) return alert('Selecione um arquivo')

        const { url, type } = await uploadToSupabase(preview.file)

        const response = await NewPostAction({
            preview: { file: url, type: type},
            data: {description: data.description, tags: data.tags},
        })

        if (!response.status) {

        } else {
            
        }
    }

    return (
        <div className="w-full h-full p-3 relative">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(newPostHandler)}>
                <label htmlFor="description">Post description</label>
                <input
                    {...register("description")}
                    type="text"
                    id="description" 
                    placeholder="write your description here"
                    className="border border-[#ccc] w-full text-xs px-2 h-8 rounded-sm outline-0" />
                
                {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}

                <label htmlFor="tag">Tags</label>

                <div className="flex gap-2">
                    <input
                        onKeyDown={(e) => {
                            if(e.key !== "Enter") return;
                            e.preventDefault();
                            selectTag();
                        }}

                        type="text"
                        id="tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="choose some tags to mark your post"
                        className="border border-[#ccc] w-full text-xs px-2 h-8 rounded-sm outline-0" />

                    <button 
                        type="button" 
                        onClick={selectTag}
                        className="bg-blue-500 text-white text-xs px-4 rounded-sm cursor-pointer">
                        
                        Pick
                    </button>
                </div>
                    
                {errors.tags && <p className="text-xs text-red-500">{errors.tags.message}</p>}

                <div className="flex gap-2 flex-wrap">
                    {
                        tags.map((e: string) => (
                            <p 
                                key={e} 
                                className="border px-2 py-1 text-xs rounded-md cursor-pointer w-auto" 
                                onClick={() => setValue("tags",[...tags.filter(o => o !== e)])}>

                                {e}
                            </p>
                        ))
                    }
                </div>

                    
                <button className={`cursor-pointer bg-blue-500 text-white w-[90%] py-1.5 rounded-md
                absolute top-[98%] translate-y-[-98%] left-[50%] translate-x-[-50%]`}>
                    To post
                </button>
            </form>
        </div>
    )
}