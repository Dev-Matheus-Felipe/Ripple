import { ViewPostModal } from "@/components/modals/viewPost"
import { SessionProvider } from "next-auth/react";

export default async function  PostModal({params} : {params: {id: string}}){
    const {id} = await params;

    return (
        <SessionProvider>
            <ViewPostModal postId={id} />
        </SessionProvider>
    )
}