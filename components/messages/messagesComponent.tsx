"use client"

import { FindUser } from "@/lib/actions/messages/findUser"
import { ConversationsType, MessagesType } from "@/lib/actions/messages/getInitialMessages"
import { supabase } from "@/lib/supabase/client"
import { Search, Send } from "lucide-react"
import { User } from "next-auth"
import Image from "next/image"
import { useEffect, useState } from "react"

type UserFoundType = {
  name: string,
  username: string | null,
  image: string | null
}

export function MessagesComponnet({
  initialMessages,
  user,
}: {
  initialMessages: ConversationsType[]
  user: User
}) {

  const [conversations, setConversations] = useState<ConversationsType[]>(initialMessages);
  const [currentConversation, setCurrentConversation] = useState<ConversationsType | null>(null);

  const [userSearch, setUserSearch] = useState<{search: string, user: UserFoundType[] | null}>({
    search: "",
    user: null
  });

  useEffect(() => {
    const channel = supabase
      .channel(`user:${user.id}`)
      .on(
        "broadcast",
        { event: "new-message" },
        ({ payload }) => {
            
          const newMessage: MessagesType = payload.newMessage
          const conversationId = newMessage.conversationId

          setConversations(prev => {
            const exists = prev.find(c => c.id === conversationId)

            if (exists) {
              return prev.map(c => {
                if (c.id !== conversationId) return c

                return {
                  ...c,
                  messages: [...c.messages, newMessage],
                }
              })
            }

            return [
              {
                ...payload.conversation,
                messages: [newMessage],
              },
              ...prev,
            ]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user.id])

  useEffect(() => {
    const findUser = async() => {
      if(userSearch.search.length > 0){
        const userFound = await FindUser({search: userSearch.search})
        setUserSearch(prev => ({...prev, user: userFound}));
      }
    }

    findUser();
  },[userSearch.search]);


  if(!user || !user.id) return null;

  return (
    <div className="flex">
      <div className="w-90 h-screen border-r border-[#343434] py-[4%] px-[1%]">
        <div className="flex w-full flex-col gap-5">
          <h1 className="text-lg font-bold">{user.name}</h1>

          <div className="relative">
              <input 
                type="text" 
                value={userSearch.search}
                onChange={(e) => setUserSearch(prev => ({...prev, search: e.target.value}))}
                className="w-full h-10 bg-(--secondary-button) rounded-2xl outline-0 px-3 pr-10 text-sm" />

              <Search size={18} className="absolute top-1/2 -translate-y-1/2 left-[90%]" />
          </div>
        </div>

        
        {
          userSearch.search.length === 0
             ? <div className="w-full flex flex-col mt-10 font-bold">
                <h1>Messages</h1>

                {
                  conversations.length > 0 
                    ? conversations.map(e => {
                        const userMessage = e.userAId === user.id ? e.userA : e.userB;

                        return (
                          <div className="w-full h-10 flex items-center" key={e.id}>
                            <Image src={userMessage.image ?? "/generals/profile.svg"} alt={"User Image"} width={30} height={30} />
                            <div className="w-full h-full">
                              <p>{userMessage.name}</p>
                              <p>{userMessage.username}</p>
                            </div>
                          </div>
                        )
                      })
                    
                    : <p className="mt-5 font-normal text-sm">No conversations found...</p>
                }
              </div>

            : <div className="max-h-screen overflow-y-auto py-5">
                {
                  userSearch.user?.map(e => (
                    <div className="w-full h-15 flex items-center gap-3" key={e.username}>
                      <Image 
                        src={e.image ?? "/generals/profile.svg"} 
                        alt={"User Image"} 
                        width={48} 
                        height={48} 
                        className="rounded-full min-w-12  h-12 object-cover object-center" />

                      <div className="w-full">
                        <p className="text-sm font-bold">{e.name}</p>
                        <p className="text-xs">{e.username}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
             
        }

        
      </div>

      <div className="flex-1 flex justify-center items-center flex-col">
          {
            !currentConversation ?
              <>
                  <div className="border w-17 h-17 rounded-full relative">
                    <Send size={37} className=" absolute top-[53%] left-[47%] translate-[-50%]" />
                  </div>

                  <p className="mt-5">Send photos or talk to friends here</p>
              </>

              : 

              <div>

              </div>
          }
      </div>
    </div>
  )
}
