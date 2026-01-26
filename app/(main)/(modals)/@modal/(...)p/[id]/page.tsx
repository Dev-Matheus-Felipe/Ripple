import { ViewPostModal } from "@/components/modals/viewPost"
import { GetUniquePost } from "@/lib/actions/post/getPosts";
import { SessionProvider } from "next-auth/react";

export default async function  PostModal({params} : {params: {id: string}}){
    const {id} = await params;

    const post = await GetUniquePost({id: id});
    if(!post) return <p>Post not Found</p>;

    return (
        <SessionProvider>
            <ViewPostModal post={post} />
        </SessionProvider>
    )
}