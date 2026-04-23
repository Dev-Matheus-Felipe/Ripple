"use client"

import { Aperture, Compass, Heart, House, Menu, Search, Send, User } from "lucide-react";
import Nav from "./buttons/nav/nav";
import { useTheme } from "next-themes";

export function NavBar(){
    const {setTheme} = useTheme();

    return (
        <div className={`fixed md:top-0 top-full max-md:-translate-y-full md:max-w-57 md:min-w-55 w-full md:h-screen h-20
        p-[1%] max-md:px-3 py-4 flex md:flex-col justify-between`}>
            <Aperture size={25} className="max-md:hidden ml-3" />

            <div className="w-full h-[85%] flex md:flex-col justify-between max-md:items-center">
                <div className="flex md:flex-col gap-5 md:w-full">
                    <Nav href="/" text="Home">
                        <House size={24} />
                    </Nav>

                    <Nav href="/" text="Search">
                        <Search size={23} />
                    </Nav>

                    <Nav href="/explorar" text="Reels">
                        <Compass size={24} />
                    </Nav>

                    <Nav href="/messages" text="Messages">
                        <Send size={24} />
                    </Nav>

                    <Nav href="/" text="Notifications">
                        <Heart size={24} />
                    </Nav>
                    
                    <Nav href="/" text="Create">
                        <Compass size={24} />
                    </Nav>

                    <Nav href="/profile" text="Profile">
                        <User size={24} />
                    </Nav>
                </div>

                <Menu size={30} className="ml-2 cursor-pointer" onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")} />
            </div>

        </div>
    )
}