"use client"

import { useContext, useState } from "react";
import { Heart, House, Plus, Send, SquarePlay, Search } from "lucide-react";
import { CreatePostContext } from "@/components/contexts/createPost";
import Image from "next/image";
import { Session } from "next-auth";


const icon_size = 25;


export function MobileSidebar({session} : {session: Session | null}){
    const [popUp, setPopUp] = useState<string>("");

    const container_button = () => ` rounded-md cursor-pointer `;

    const ctx = useContext(CreatePostContext);
    if(!ctx) return null;

    const {setState} = ctx;

    return (
        <>
            <div className="flex justify-between px-5 mt-2 md:hidden h-15 items-center w-full">
                <button className={`cursor-pointer`} onClick={() => setState(prev => !prev)}>
                    <div className={container_button()}>
                        <Plus size={32}/>
                    </div>
                </button>

                <h1 className="text-2xl">Ripple</h1>

                <button className={`cursor-pointer`}>
                    <Heart size={icon_size} />
                </button>
            </div>

            <div className={`w-full fixed top-full left-0 -translate-y-full border-t border-(--modal-border-b) h-17 z-20 
            bg-(--primary-background) items-center flex px-5 gap-3 justify-between  md:hidden`}>
                <House size={26} />
                <SquarePlay size={26} />
                <Send size={26}/>
                <Search size={26} />
                <Image
                    src={session?.user?.image ?? "/generals/profile.svg"} 
                    alt="profile picture"
                    width={30}
                    height={30}
                    className="rounded-full w-7.5 h-7.5 object-cover object-center" />
            </div>
        </>
    )
}