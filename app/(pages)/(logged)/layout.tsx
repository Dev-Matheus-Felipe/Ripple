import { PostContext } from "@/components/contexts/createPost";
import { Sidebar } from "@/components/sidebar/sidebar";
import { SessionProvider } from "next-auth/react";
import React, { Suspense } from "react";

export default function MainLayout({children, modal} : {children: React.ReactNode, modal: React.ReactNode}){
    return (
        <PostContext>
                <div className="flex relative">
                    <SessionProvider>
                        <Sidebar />
                    </SessionProvider>
                    {modal}

                    <div className="z-1 w-full h-screen overflow-auto">
                        <Suspense fallback={<p>OLA AMIGOS</p>}>
                            {children}
                        </Suspense>
                    </div>
                </div>
        </PostContext>
    )
}