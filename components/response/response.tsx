"use client"

import { ToLikeResponse } from "@/lib/actions/response/toLikeResponse";
import { Response as ReponseType} from "@/lib/types/post";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Response({response} : {response: ReponseType}){
    const [likes, setLikes] = useState<{state: boolean, likes: number}>({state: false, likes: response.likes.length});
    const {data: session} = useSession();
    

    const toLike = async(response : ReponseType) => {
        const result  = await ToLikeResponse({response: response});

        setLikes(prev => ({state: !result, likes: result ? prev.likes - 1 : prev.likes + 1}));

    }

    useEffect(()=>{
        const isLiked = async() => {
            if(!session?.user || !session.user.id) return;
            const hasLiked = response.likes.includes(session.user.id) ? true : false;
            setLikes(prev => ({...prev, state: hasLiked}));
        }

        isLiked();
    },[])

    return (
        <div className="w-full h-20 flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Image
                    className="rounded-full"
                    src={response.author.image ?? "/generals/profile.svg"}
                    alt={"author picture"} 
                    width={30} 
                    height={30} />

                    <h1>{response.author.username ?? "Matheus Felipe"}</h1>
                </div>

                <Heart 
                    size={14} 
                    className="cursor-pointer" 
                    fill={likes.state ? "var(--text-primary-color)" : ""}
                    onClick={()=> toLike(response)} />
            </div>

            <p>{response.content}</p>

            <p>{likes.likes} curtidas</p>
        </div>
    )
}