import { MessagesComponnet } from "@/components/messages/messagesComponent";
import { ConversationsType, GetInitialMessages } from "@/lib/actions/messages/getInitialMessages";
import { auth } from "@/lib/auth";


export default async function Messages() {
  const session = await auth();
  if(!session?.user?.id) return null;

  const initialMessages: ConversationsType[] = await GetInitialMessages({userId: session.user.id});

  return <MessagesComponnet initialMessages={initialMessages} user={session.user} />;
}