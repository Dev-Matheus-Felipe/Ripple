import { GetMyUserData } from "@/lib/actions/profile/getMyUserData";
import { auth } from "@/lib/auth";
import { MyProfileData } from "@/lib/types/myProfileData";
import { Bookmark, Film, Grid3X3, Menu, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Profile() {
  const session = await auth();

  if(!session?.user?.id) return null;

  const userData: MyProfileData | null  = await GetMyUserData({userId: session.user.id});

  if(!userData) return <p>Not Found</p>;

  const titleButtons = 
  "px-3 py-1.5 bg-(--secondary-button) rounded-md cursor-pointer hover:bg-[#512da8] hover:text-white text-sm b500:block hidden";

  return (
    <div className="max-w-250 h-screen flex flex-col items-center p-3 pt-20 m-auto">
      <div className="flex lg:w-150 w-full gap-5 justify-center">
        <button className="relative">
          <Image 
            src={userData.image ?? "/generals/profile.svg"} 
            width={150} 
            height={150} 
            alt="profile picture"
            className="rounded-full lg:w-37.5 lg:h-37.5 md:w-30 md:h-30 max-b500:w-20 max-b500:h-20  object-cover object-center" />
        </button>

        <div className="flex flex-col b500:gap-3 gap-1">
          <div className="flex gap-3 items-center  max-b500:justify-between">
            <h1 className="text-lg  md:pr-10 pr-0">{userData.username}</h1>

           <Link className={titleButtons + " text-center"} href="/profile/edit">
              Edit Profile
          </Link>

            <button className={titleButtons}>
              Log out
            </button>

            <Menu size={25} className="hidden max-b500:flex" />

          </div>

          <div className="flex b500:gap-5 gap-3 text-(--primary-color)">
            <p className="max-b500:text-sm">
              <span className="text-(--text-primary-color)">{userData.posts.length + " "}</span> 
              posts
            </p>

            <p className="max-b500:text-sm">
              <span className="text-(--text-primary-color)">{userData.followers.length + " "}</span> 
              followers
            </p>

            <p className="max-b500:text-sm">
              <span className="text-(--text-primary-color)">{userData.following.length + " "}</span> 
              followings
            </p>
          </div>

          <div className="flex flex-col">
            <h3>{userData.name}</h3>
            <p className="text-xs">{userData.bio}</p>
          </div>
        </div>
      </div>


      <div className="border-b b500:mt-35 mt-15 border-(--modal-border-b) w-full h-10 flex justify-around">
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
