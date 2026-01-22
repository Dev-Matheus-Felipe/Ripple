import { DesktopSidebar } from "./desktopSidebar/desktopSidebar";
import { MobileSidebar } from "./mobileSidebar/mobileSidebar";
import { auth } from "@/lib/auth";

export async function Sidebar(){
    const session = await auth();

    return (
        <>
            <DesktopSidebar session={session} />
            <MobileSidebar session={session} />
        </>
    )
}