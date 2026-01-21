"use client"

import { EditFormAction } from "@/lib/actions/profile/editForm";
import { uploadImageSupabase } from "@/lib/actions/profile/supabaseHandler";
import { EditFormSchema } from "@/lib/actions/profile/zodEditform";
import { ProfileEditForm } from "@/lib/types/profileEditForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { default as Img } from "next/image"
import { useState } from "react";
import { useForm } from "react-hook-form";

export type EditFormValues = {
    image: string | File,
    name: string,
    username: string,
    bio?: string | undefined
}

export type EditFormPayload = {
  image: string
  name: string
  username: string
  bio?: string
}


const inputForm = "w-full h-11 rounded-md bg-(--secondary-button) outline-0 px-5 text-sm";
const divForm = "flex flex-col gap-3 w-full";
const labelForm = "font-bold text-lg";

const FileTypes = ["image/png","image/jpg","image/jpeg","image/webp"];

export function EditForm({user} : {user: ProfileEditForm}){
    const initialValues: EditFormValues = {
        image: user.image ?? "/generals/profile.svg",
        name: user.name ?? "Undefined User",
        username: user.username ?? "",
        bio: user.bio ?? ""
    }

    const {
        register,
        formState: {errors, isDirty},
        watch,
        setValue,
        handleSubmit,

    } = useForm<EditFormValues>({
        defaultValues: initialValues,
        resolver: zodResolver(EditFormSchema)
    });

    const [preview, setPreview] = useState<string | null>();

    const name = watch("name");
    const username = watch("username");

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

        const img = new Image()
        img.src = url;

        img.onload = () => {
            setPreview(url);
            setValue("image", file);
        };
    }

    const submitForm = async(data: EditFormValues) => {
        let imageUrl: string | null = null;

        if(data.image instanceof File){
            const file = data.image;
            imageUrl = await uploadImageSupabase({file: file, userId: user.id});
        
        }else{
            imageUrl = data.image
        }

        const newData: EditFormPayload = {...data, image: imageUrl};

        const result = await EditFormAction({data: newData});

        console.log(result.message);
    }


    return (
         <div className="w-full flex flex-col lg:p-20 lg:pt-15 items-center p-3 pt-10 gap-10 md:pb-0!">
            <div className="flex justify-between  items-center md:max-w-150 w-full">
                <h1 className="text-2xl font-bold">Edit Profile</h1>
                <button className={`b500:hidden block bg-linear-to-r from-[#512da8] to-[#6236c8] rounded-sm cursor-pointer w-25 
                text-sm h-10`}>
                    Save Changes
                </button>
            </div>

            <div className={`flex justify-between items-center b500:px-5 px-3 md:max-w-150 w-full h-21 max-b500:py-4
            b500:rounded-2xl rounded-md bg-(--secondary-button)`}>

                
                <div className="flex gap-5 items-center">
                    <Img 
                        src={preview ? preview : user.image ?? "/generals/profile.svg"} 
                        alt={"profile picture"} 
                        width={60} 
                        height={60}
                        className="rounded-full b500:w-15 b500:h-15 w-10 h-10 object-cover object-center" />

                    <div className="flex flex-col">
                        <h2 className="font-bold b500:text-md text-sm">{username}</h2>
                        <h3 className="text-(--primary-color) b500:text-sm text-xs">{name}</h3>
                    </div>
                </div>

                <label className="px-2 py-3 bg-[#512da8] text-white  rounded-md cursor-pointer text-xs">
                    Change Picture

                    <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </label>
            </div>

            <form className="md:max-w-150 w-full flex flex-col gap-6 items-end" onSubmit={handleSubmit(submitForm)}>
                <div className={divForm}>
                    <label className={labelForm}>Name</label>
                    <input 
                        {...register("name")}
                        type="text" 
                        className={inputForm}
                        placeholder="Name" />

                    { errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p> }
                </div>

                <div className={divForm}>
                    <label className={labelForm}>Username</label>
                    <input 
                        {...register("username")}
                        type="text" 
                        className={inputForm} 
                        placeholder="Username" />

                    { errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p> }
                </div>

                <div className={divForm}>
                    <label className={labelForm}>Bio</label>
                    <input 
                        {...register("bio")}
                        type="text" 
                        className={inputForm} 
                        placeholder="Bio" />

                    { errors.bio && <p className="text-red-500 text-xs">{errors.bio.message}</p> }
                </div>

                <button className={`b500:block hidden bg-linear-to-r from-[#512da8] to-[#6236c8] 
                rounded-sm cursor-pointer w-24 text-xs b500:h-10 h-0`}>
                    Save Changes
                </button>
            </form>
        </div>
    )
}