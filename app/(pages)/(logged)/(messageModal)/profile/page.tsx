import { ProfileComponent } from "@/components/profile/profileComponent";
import { prisma } from "@/lib/prisma";
import { Post } from "@/lib/types/post";

export default async function Profile() {
  const posts: Post[] = await prisma.post.findMany({
    include: {
      responses: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          likes: true,
          postId: true,
          authorId: true,

          author: {
            select: {
              id: true,
              username: true,
              image: true
            }
          }
        }
      },

      author: {
          select: {
            username: true,
            image: true,
            followers: true
          }
      }
    }
  });
  
  return (
    <>
     <ProfileComponent posts={posts} />
    </>
  );
}
