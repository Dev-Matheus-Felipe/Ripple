"use client"

import { ChevronsLeft, ImagePlay, X } from "lucide-react";
import { Dispatch, useState } from "react";
import { CreatePostForm } from "../forms/createPost";

const FileTypes = ["image/png","image/jpg","image/jpeg","image/webp","video/mp4","video/mkv"];

type PreviewType = {
    previewUrl: string, 
    file: File, 
    type: string,
    width: number,
    height: number
}

export function CreatePostModal({setState} : {setState: Dispatch<React.SetStateAction<boolean>>}){
    const [preview, setPreview] = useState< PreviewType | null>(null);

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) return;

        else if(!FileTypes.some(e => e === file?.type.toLocaleLowerCase())){
            console.log("Unsupported file");
            return;

        }else if(file.size >  1024 * 1024 * 30){
            console.log("File size exceeds the limit")
            return;

        }

        const url = URL.createObjectURL(file);
        const type = file.type.toLowerCase();


        if (type.startsWith("image/")) {
            const img = new Image();
            img.src = url;

            img.onload = () => {
                setPreview({
                    previewUrl: url,
                    file,
                    type,
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                });
            };
        }

        if (type.startsWith("video/")) {
            const video = document.createElement("video");
            video.src = url;
            video.preload = "metadata";

            video.onloadedmetadata = () => {
                setPreview({
                    previewUrl: url,
                    file,
                    type,
                    width: video.videoWidth,
                    height: video.videoHeight,
                });
            };
        }
    }

    function closeModal() {
        if (preview) URL.revokeObjectURL(preview.previewUrl);
        setPreview(null);
        setState(false);
    }


    return (
        <div className={`w-full h-full backdrop-blur-[10px] bg-[rgba(0,0,0,0.3)] z-999 absolute top-0 left-0 
        flex justify-center items-center p-[1%]`}>
            <X 
                size={27} 
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => closeModal()} />

            <div className={`md:h-120  bg-(--modal-post-background) rounded-md flex flex-col duration-400
            ${preview ? "w-180 h-160" :"w-110 h-120"} z-999`}>
                <div className={`bg-(--modal-post-title) w-full min-h-11 rounded-t-md flex items-center justify-center 
                border-b border-(--modal-border-b) relative`}>
                    <h1>Create new post</h1>

                    {preview && 
                        <ChevronsLeft 
                            size={20} 
                            onClick={() => setPreview(null)}
                            className="absolute left-[99%] translate-x-[-99%] top-[50%] translate-y-[-50%] cursor-pointer" />
                    }

                </div>

                
                <div className={`w-full flex-1 flex items-center justify-start  overflow-hidden flex-col
                ${!preview ? "pt-[30%] gap-5" : "md:flex-row  p-1"} `}>

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
                                <label 
                                    className={`cursor-pointer bg-linear-to-r from-[#512da8] to-[#6236c8] 
                                    text-white px-4 py-1.5 rounded-md `}>
                                    Select from device
                                    <input 
                                        type="file"
                                        accept="image/*,video/*"
                                        className="hidden"
                                        onChange={handleFile}/>
                                </label>
                            </>
                    }

                    { preview && <CreatePostForm preview={preview} closeModal={closeModal} /> }
                </div>
            </div>
        </div>
    )
}