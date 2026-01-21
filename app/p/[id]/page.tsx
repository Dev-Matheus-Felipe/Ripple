import { ViewUniquePost } from "@/components/modals/viewUniquePost";
import { Sidebar } from "@/components/sidebar/sidebar";
import { GetUniquePost } from "@/lib/actions/post/getPosts";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";

export default async function PostModal({params} : {params: {id: string}}){
    const session = await auth();
    const {id} = await params;

    const post = await GetUniquePost({id: id});
    if(!post || !session) return null;


    return (
        <div className="flex w-full h-full">
            <SessionProvider>
                <Sidebar />
            </SessionProvider>

            <div className="flex flex-1 items-center justify-center">
                <div className="border border-[#1b1e21] max-w-290 h-160 rounded-md relative flex">
                        <div className={`${post.sizeX < post.sizeY ? "min-w-120 max-w-200" : "w-200"}
                        h-full relative flex items-center justify-center`}>
                            {
                                post.visualType.startsWith("video/")
                                    ? <video
                                        src={post.visual}
                                        playsInline
                                        controls
                                        autoPlay
                                        preload="metadata"
                                        className="w-full  object-contain" />

                                    : <Image
                                        src={post.visual} 
                                        alt={"post image"} 
                                        fill
                                        loading="eager"
                                        className="object-contain" />
                            }
                        </div>

                    
                        <ViewUniquePost post={post} session={session} />
                    </div>
            </div>
        </div>
    )
}