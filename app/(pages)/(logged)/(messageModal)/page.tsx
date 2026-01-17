import { PostContainer } from "@/components/postComponent/postContainer";
import { GetPosts } from "@/lib/actions/post/getPosts";
import { Post } from "@/lib/types/post";
import { SessionProvider } from "next-auth/react";

export default async function Home() {
  const initialPosts: Post[] = await GetPosts();
  
  return (
    <div className="w-full h-full overflow-auto p-[1%] flex">
      
      <SessionProvider>
        <PostContainer initialPosts={initialPosts} />
      </SessionProvider>
      
      <div className="w-150 h-150" />
    </div>
  );
}
