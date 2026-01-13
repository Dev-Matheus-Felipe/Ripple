import { Sidebar } from "@/components/sidebar/sidebar";
import React from "react";

export default function MainLayout({children} : {children: React.ReactNode}){
    return (
        <div className="flex relative">
            <Sidebar />
            {children}
        </div>
    )
}