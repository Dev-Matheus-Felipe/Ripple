import {NavBar} from "@/components/navBar/navBar";
import React from "react";

export default function LoggedLayout({children} : {children: React.ReactNode}){
    return (
        <div className="flex min-h-screen">
            <NavBar />
            <div className="w-full ml-60 p-[2%]">
                {children}
            </div>
        </div>
    )
}