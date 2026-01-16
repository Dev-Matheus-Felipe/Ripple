import { HomePosts } from "@/lib/actions/post/getPosts"
import { X } from "lucide-react"
import Image from "next/image"
import { Dispatch } from "react"

export function ViewPostModal({
    state,
    setState
} : {
    state: HomePosts,
    setState: Dispatch<React.SetStateAction<HomePosts | null>> 
}){
    return (

        <div className={`w-full h-full backdrop-blur-[1px] bg-[rgba(0,0,0,0.3)] z-999 absolute top-0 left-0 
        flex justify-center items-center p-[1%]`}>
            <div className="bg-(--modal-post-background) w-290 h-160 rounded-md relative">
                <X
                    size={27} 
                    className="absolute top-3 right-3 cursor-pointer"
                    onClick={() => setState(null)} />

                <div className="w-190 h-full relative flex items-center justify-center bg-black">
                    {
                        state.visualType.startsWith("video/")
                            ? <video
                                src={state.visual}
                                playsInline
                                controls
                                autoPlay
                                preload="metadata"
                                className="w-full  object-contain" />
    
                            : <Image
                                src={state.visual} 
                                alt={"post image"} 
                                fill
                                loading="eager"
                                className="object-contain" />
                    }
                </div>
            </div>
        </div>
    )
}