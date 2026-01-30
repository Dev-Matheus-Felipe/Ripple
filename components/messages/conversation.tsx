import { ConversationsType } from "@/lib/actions/messages/getInitialMessages"
import { Send, X } from "lucide-react"
import { User } from "next-auth"
import Image from "next/image"
import { MessageContainer } from "./messageContainer"

export function Conversation({
    currentConversation,
    user
} : {
    currentConversation: ConversationsType | null,
    user: User
}){
    const userConversation = currentConversation?.userBId === user.id ? currentConversation?.userA : currentConversation?.userB;

    return (
        <div className="flex-1 flex justify-center items-center flex-col">
          {
            !userConversation ?
              <>
                  <div className="border w-17 h-17 rounded-full relative">
                    <Send size={37} className=" absolute top-[53%] left-[47%] translate-[-50%]" />
                  </div>

                  <p className="mt-5">Send photos or talk to friends here</p>
              </>

              : 

              <div className="w-full h-full flex flex-col">
                <div className="w-full h-20 flex justify-between items-center px-3 border-b border-[#343434]">
                    <div className="w-full h-full flex items-center gap-3">
                        <Image
                        src={userConversation.image ?? "/generals/profile.svg"} 
                        alt={"User Image"} 
                        width={52} 
                        height={52} 
                        className="rounded-full min-w-13  h-13 object-cover object-center" />

                        <div className="w-full">
                            <p className="text-sm font-bold">{userConversation.name}</p>
                            <p className="text-xs">{userConversation.username}</p>
                        </div>    
                    </div>

                    <X size={26} />
                </div>

                <MessageContainer />


                <form className="m-auto my-5 w-[95%] h-12 rounded-2xl border border-[#343434] px-5 relative pr-14">
                    <input type="text" className="w-full h-full outline-0 text-sm" />
                    <Send size={24} className="absolute left-[96%] top-1/2 -translate-y-1/2" />
                </form>
              </div>    
          }
      </div>
    )
}