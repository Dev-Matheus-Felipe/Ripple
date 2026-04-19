import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  if(!session?.user) return null;

  console.log(session.user);
  
  return (
    <p>{session.user.email}</p>
  );
}
