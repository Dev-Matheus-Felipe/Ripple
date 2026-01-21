"use client"

import { DesktopSidebar } from "./desktopSidebar/desktopSidebar";
import { useSession } from "next-auth/react";
import { MobileSidebar } from "./mobileSidebar/mobileSidebar";

export function Sidebar(){
    const {data: session} = useSession();

    return (
        <>
            <DesktopSidebar session={session} />
            <MobileSidebar session={session} />
        </>
    )
}