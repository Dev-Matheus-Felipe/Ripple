"use client"

import { FindUser } from "@/lib/actions/messages/findUser"
import { ConversationsType } from "@/lib/actions/messages/getInitialMessages"
import { supabase } from "@/lib/supabase/client"
import { Search } from "lucide-react"
import { User } from "next-auth"
import { useEffect, useState } from "react"
import { UsersContainer } from "./usersContainet"
import { Conversation } from "./conversation"

export type UserFoundType = {
  name: string,
  username: string | null,
  image: string | null,
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
            
          const conversationId = payload.newMessage.conversationId;

          setConversations(prev => {
            const exists = prev.find(c => c.id === conversationId)

            if (exists) {
              return prev.map(c => {
                if (c.id !== conversationId) return c;

                const userA = c.userAId === user.id;

                return (userA) 
                  ? {...c, unreadA: c.unreadA++} 
                  : {...c, unreadA: c.unreadB++}
              })
            }

            return [
              { ...payload.conversation },
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
        
        <UsersContainer 
          conversations={conversations} 
          setCurrentConversation={setCurrentConversation}
          userSearch={userSearch} 
          user={user} />

      </div>
  )
}


/*      
<Conversation currentConversation={currentConversation} user={user} />
*/