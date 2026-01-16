import { PostContainer } from "@/components/postComponent/postContainer";
import { GetPosts } from "@/lib/actions/post/getPosts";

export default async function Home() {
  const initialPosts = await GetPosts();
  
  return (
    <div className="w-full h-full overflow-auto p-[1%] flex">
      <PostContainer initialPosts={initialPosts} />
      <div className="w-150 h-150" />
    </div>
  );
}
