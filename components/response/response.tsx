"use client";

import { ToLikeResponse } from "@/lib/actions/response/toLikeResponse";
import { Response as ResponseType } from "@/lib/types/post";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Dispatch } from "react";

export function Response({
    response,
    userId,
    setMessages,
}: {
    response: ResponseType;
    userId: string | undefined;
    setMessages: Dispatch<React.SetStateAction<ResponseType[]>>;
}) {
    const isLiked = !!userId && response.likes.includes(userId);

    const toLike = async () => {
        if (!userId) return;

        const hasLiked = await ToLikeResponse({ response: response });

        setMessages(res => ({
            ...res,
            likes: hasLiked
                ? res.filter(id => id.id !== userId)
                : [...res, userId]
        }))
    };

    return (
        <div className="w-full h-20 flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Image
                        className="rounded-full object-cover object-center w-7.5 h-7.5"
                        src={response.author.image ?? "/generals/profile.svg"}
                        alt="author picture"
                        width={30}
                        height={30}
                    />
                    <h1>{response.author.username ?? "Matheus Felipe"}</h1>
                </div>

                <Heart
                    size={14}
                    className="cursor-pointer"
                    fill={isLiked ? "red" : "transparent"}
                    color={isLiked ? "red" : "var(--text-primary-color)"}
                    onClick={toLike}
                />
            </div>

            <p>{response.content}</p>
            <p>{response.likes.length} likes</p>
        </div>
    );
}
