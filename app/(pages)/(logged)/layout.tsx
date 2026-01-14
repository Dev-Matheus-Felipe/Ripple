import { PostContext } from "@/components/contexts/createPost";
import { Sidebar } from "@/components/sidebar/sidebar";
import React from "react";

export default function MainLayout({children} : {children: React.ReactNode}){
    return (
        <PostContext>
            <div className="flex relative">
                <Sidebar />

                <div className="p-[2%] z-1">
                    {children}
                </div>
            </div>
        </PostContext>
    )
}