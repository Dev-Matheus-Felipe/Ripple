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

export function CreatePostForm({
    preview, 
    closeModal
} : {
    preview: {file: File, type: string, width: number, height: number},
    closeModal: () => void}){
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
        const regex = /^[a-zA-Z0-9]{3,10}(-[a-zA-Z0-9]{3,10})?$/;


        if(tags.length >= 3 || tags.includes(newTag) || !regex.test(newTag)) return;

        setValue("tags", [...tags, newTag]);
        setNewTag("");
    }

    async function newPostHandler(data: newPostType) {
        if (!preview.file) return alert('Select a file');

        const { url, type } = await uploadToSupabase(preview.file)

        const response = await NewPostAction({
            preview: { file: url, type: type, width: preview.width, height: preview.height},
            data: {description: data.description, tags: data.tags},
        })

        if (!response.status) {

        } else {
            closeModal();
        }
    }

    return (
        <div className="w-full h-full p-3 relative">
            <form className="flex flex-col md:gap-5 gap-3" onSubmit={handleSubmit(newPostHandler)}>
                <label htmlFor="description">Description</label>
                <input
                    {...register("description")}
                    type="text"
                    id="description" 
                    placeholder="Describe your post"
                    className="border border-[#ccc] w-full text-xs px-2 h-8 rounded-sm outline-0" />
                
                {errors.description && <p className="text-[10px] text-red-500">{errors.description.message}</p>}

                <label htmlFor="tag">Post tags</label>

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
                        placeholder="Add tags related to the post"
                        className="border border-[#ccc] w-full text-xs px-2 h-8 rounded-sm outline-0" />

                    <button 
                        type="button" 
                        onClick={selectTag}
                        className={`bg-linear-to-r from-[#512da8] to-[#6236c8] text-white text-xs px-4 rounded-sm 
                        cursor-pointer`}>
                        
                        Add
                    </button>
                </div>
                    
                {errors.tags && <p className="text-[10px] text-red-500">{errors.tags.message}</p>}

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

                    
                <button className={`cursor-pointer bg-linear-to-r from-[#512da8] to-[#6236c8] w-full md:w-[90%]
                absolute top-[98%] translate-y-[-98%] left-[50%] translate-x-[-50%] text-white py-2 rounded-md`}>
                    Public post
                </button>
            </form>
        </div>
    )
}