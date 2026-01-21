import { ProfileComponent } from "@/components/profile/profileComponent";
import { GetMyUserData } from "@/lib/actions/profile/getMyUserData";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MyProfileData } from "@/lib/types/myProfileData";
import { Bookmark, Film, Grid3X3, Pencil } from "lucide-react";
import Image from "next/image";

export default async function Profile() {
  const session = await auth();

  if(!session?.user?.id) return null;

  const userData: MyProfileData | null  = await GetMyUserData({userId: session.user.id});

  if(!userData) return <p>Not Found</p>;

  const titleButtons = "px-3.5 py-1.5 bg-(--secondary-button) rounded-md cursor-pointer hover:bg-[#512da8] hover:text-white text-sm";

  return (
    <div className="w-[80%] h-screen flex flex-col items-center pt-20 m-auto">
      <div className="flex w-150 gap-5">
        <button className="group cursor-pointer relative">
          <Image 
            src={userData.image ?? "/generals/profile.svg"} 
            width={150} 
            height={150} 
            alt="profile picture"
            className="rounded-full" />

            <div className="w-37.5 h-37.5 group-hover:flex hidden absolute top-0 left-0 rounded-full bg-[rgba(118,118,118,0.33)]">
              <Pencil size={25} className=" absolute top-1/2 left-1/2 -translate-1/2" color="white" />
            </div>
        </button>

        <div className="flex flex-col gap-5">
          <div className="flex gap-3 items-center">
            <h1 className="text-lg pr-10">{userData.username}</h1>

            <button className={titleButtons}>
              Edit Profile
            </button>

            <button className={titleButtons}>
              Exit
            </button>

          </div>

          <div className="flex gap-5 text-(--primary-color)">
            <p><span className="text-(--text-primary-color)">{userData.posts.length}</span> posts</p>
            <p><span className="text-(--text-primary-color)">{userData.followers.length}</span> followers</p>
            <p><span className="text-(--text-primary-color)">{userData.following.length}</span> followings</p>
          </div>

          <div className="flex">
            <h3>{userData.name}</h3>
            <p>{userData.bio}</p>
          </div>
        </div>
      </div>


      <div className="border-b mt-50 border-(--modal-border-b) w-full h-10 flex justify-around">
        <div className="border-b-2 w-12 flex justify-center">
          <Grid3X3 size={26}  />
        </div>

        <div className="">
          <Film size={26} color="var(--primary-color)" />
        </div>
        
        <div className="">
          <Bookmark  size={26} color="var(--primary-color)" />
        </div>
       
      </div>
     
    </div>
  );
}
