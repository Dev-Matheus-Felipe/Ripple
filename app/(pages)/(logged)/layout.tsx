import { PostContext } from "@/components/contexts/createPost";
import { ViewPostContext } from "@/components/contexts/viewPost";
import { Sidebar } from "@/components/sidebar/sidebar";
import React, { Suspense } from "react";

export default function MainLayout({children} : {children: React.ReactNode}){
    return (
        <PostContext>
            <ViewPostContext>
                <div className="flex relative">
                    <Sidebar />

                    <div className="z-1 w-full h-screen overflow-auto">
                        <Suspense fallback={<p>OLA AMIGOS</p>}>
                            {children}
                        </Suspense>
                    </div>
                </div>
            </ViewPostContext>
        </PostContext>
    )
}