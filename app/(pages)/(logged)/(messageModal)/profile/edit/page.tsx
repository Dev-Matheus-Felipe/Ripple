import { EditForm } from "@/components/profile/editForm";
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma";

export default async function Edit(){
    const session = await auth();
    
    const user = await prisma.user.findUnique({
        where: {id: session?.user?.id ?? ""}
    });

    if(!user || !session) return null;

    return (
        <EditForm user={user} />
    )
}