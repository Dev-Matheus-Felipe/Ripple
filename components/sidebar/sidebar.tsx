"use client"

import { Circle, Compass, Heart, House, Menu, Plus, Search, Send, SquarePlay } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const isPop = ["/search", "/notifications"];
const icon_size = 24;

export function Sidebar(){
    const [mounted, setMounted] = useState<boolean>(false);
    const [popUp, setPopUp] = useState<string>("");

    const {theme, setTheme} = useTheme();
    const pathname = usePathname();

    const showPopUp = (name: string) => {
        setPopUp(name);
    }

    useEffect(()=>{ 
        setMounted(true);
    },[])

    if(!mounted) return null;

    const linkStles = (link: string) => `${pathname === link ? "font-bold" : "text-(--primary-color)"} `;

    const container_button = (selected?: string ) => `p-2 rounded-md cursor-pointer 
        ${isPop.some(e => e === popUp) && "hover:bg-(--button-hover)"} ${selected === popUp && "bg-(--button-hover)"} `;

    
    
    const container_link = `flex gap-3 h-13 items-center cursor-pointer rounded-sm pl-5 w-full 
        ${!isPop.some(e => e === popUp) && "hover:bg-(--button-hover)"}`;

    return (
        <div className={`flex flex-col justify-between h-screen items-center pt-10 pb-5 duration-600 border-[#363636]
        ${!isPop.some(e => e === popUp) ? "w-60 border-r" : "w-20"}`}>

            <div className="w-[88%] h-[80%] flex flex-col gap-8 overflow-hidden">
                <h1 className={`font-bold w-60 px-4`}>LOGO</h1>

                <div className="flex flex-col gap-1.5 text-sm">

                    {/* --------------------- HOME PAGE --------------------- */}
                    <Link className={container_link} href={"/"} onClick={()=> showPopUp("/home")}>
                        <div  className={container_button()}>
                            <House size={icon_size}/>
                        </div>

                        <h1 className={linkStles("/")}>Homepage</h1>
                    </Link>


                    {/* --------------------- SEARCH PAGE --------------------- */}
                    <button className={container_link} onClick={() => showPopUp("/search")}>
                        <div  className={container_button("/search")}>
                            <Search size={icon_size}/>
                        </div>

                        <h1 className="text-(--primary-color)">Search</h1>
                    </button>

                    {/* --------------------- EXPLORE PAGE --------------------- */}
                    <Link className={container_link} href={"/explore"} onClick={() => showPopUp("/explore")}>
                        <div  className={container_button()}>
                            <Compass size={icon_size}/>
                        </div>

                        <h1 className={linkStles("/explore")}>Explore</h1>
                    </Link>

                    {/* --------------------- REELS PAGE --------------------- */}
                    <Link className={container_link} href={"/reels"} onClick={() => showPopUp("/reels")}>
                        <div  className={container_button()}>
                            <SquarePlay size={icon_size}/>
                        </div>

                        <h1 className={linkStles("/reels")}>Reels</h1>
                    </Link>

                    {/* --------------------- MESSAGES PAGE --------------------- */}
                    <Link className={container_link} href={"/messages"} onClick={() => showPopUp("/messages")}>
                        <div  className={container_button()}>
                            <Send size={icon_size}/>
                        </div>

                        <h1 className={linkStles("/messages")}>Messages</h1>
                    </Link>

                    {/* --------------------- NOTIFICATIONS PAGE --------------------- */}
                    <button className={container_link} onClick={() => showPopUp("/notifications")}>
                       <div  className={container_button("/notifications")}>
                            <Heart size={icon_size}/>
                        </div>

                        <h1 className="text-(--primary-color)">Notifications</h1>
                    </button>

                    {/* --------------------- CREATE PAGE --------------------- */}
                    <div className={container_link}>
                        <div  className={container_button()}>
                            <Plus size={icon_size}/>
                        </div>

                        <h1 className="w-60 h-5 overflow-hidden text-(--primary-color)">To create</h1>
                    </div>


                    {/* --------------------- PROFILE PAGE --------------------- */}
                    <Link className={container_link} href={"/profile"} onClick={() => showPopUp("/explore")}>
                        <div className={container_button()}>
                            <Circle size={icon_size}/>
                        </div>

                        <h1 className={linkStles("/profile")}>Profile</h1>
                    </Link>
                </div>
            </div>  

            <div className="w-[88%] h-13  gap-2 relative overflow-hidden">
                <button 
                    className={`w-60 h-full flex items-center cursor-pointer rounded-sm px-5 duration-300
                    ${!isPop.some(e => e === popUp) ? "hover:bg-(--button-hover) gap-2" : "gap-5"} `}
                    onClick={() =>  setTheme(theme === "dark" ? "light"  : "dark")}>

                    <div className={`${isPop.some(e => e === popUp) && "hover:bg-(--button-hover)"} p-2 rounded-md cursor-pointer`}>
                        <Menu size={icon_size}/>
                    </div>
                    <p>More</p>
                </button>
            </div>
        </div>
    )
}

