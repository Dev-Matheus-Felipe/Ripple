"use client"

import { ChevronsLeft, ImagePlay, X } from "lucide-react";
import { Dispatch, useState } from "react";
import { CreatePostForm } from "../forms/createPost";

const FileTypes = ["image/png","image/jpg","image/jpeg","image/webp","video/mp4","video/mkv"];

export function CreatePostModal({setState} : {setState: Dispatch<React.SetStateAction<boolean>>}){
    const [preview, setPreview] = useState<{previewUrl: string, file: File, type: string} | null>(null);

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) return;

        else if(!FileTypes.some(e => e === file?.type)){
            return;

        }else if(file.size / 1000000 > 30){
            return;

        }

        setPreview({previewUrl: URL.createObjectURL(file), type: file.type, file: file});
    }

    function closeModal() {
        if (preview) URL.revokeObjectURL(preview.previewUrl);
        setPreview(null);
        setState(false);
    }


    return (
        <div className={`w-full h-full backdrop-blur-[1px] bg-[rgba(0,0,0,0.3)] z-999 absolute top-0 left-0 
        flex justify-center items-center`}>
            <X 
                size={30} 
                className="absolute top-[2%] left-[99%] translate-x-[-99%] cursor-pointer"
                onClick={() => closeModal()} />

            <div className={`h-120 bg-(--modal-post-background) rounded-md flex flex-col duration-400
            ${preview ? "w-180" :"w-120"}`}>
                <div className={`bg-(--modal-post-title) w-full min-h-11 rounded-t-md flex items-center justify-center 
                border-b border-(--modal-border-b) relative`}>
                    <h1>Create new post</h1>

                    {preview && 
                    <ChevronsLeft 
                        size={20} 
                        onClick={() => setPreview(null)}
                        className="absolute left-[99%] translate-x-[-99%] top-[50%] translate-y-[-50%] cursor-pointer" />}

                </div>

                
                <div className={`w-full flex-1 flex items-center justify-start flex-col  overflow-hidden
                ${!preview ? "pt-[25%] gap-5" : "flex-row p-1"} `}>

                    {   
                        preview
                            ? preview.type.startsWith("video/")
                                ? <video
                                    src={preview.previewUrl}
                                    className="w-120 h-full object-cover"
                                    controls
                                    muted
                                    playsInline />

                                : <img 
                                    src={preview?.previewUrl} 
                                    alt="Preview" 
                                    className="object-cover w-120 h-full" />
                            : <>
                                <ImagePlay size={50} />
                                <h2>Drag the photos and videos here</h2>
                                <label className="cursor-pointer bg-blue-500 text-white px-4 py-1.5 rounded-md ">
                                    Select from computer
                                    <input 
                                        type="file"
                                        accept="image/*,video/*"
                                        className="hidden"
                                        onChange={handleFile}/>
                                </label>
                            </>
                    }

                    { preview && <CreatePostForm preview={preview} /> }
                </div>
            </div>
        </div>
    )
}