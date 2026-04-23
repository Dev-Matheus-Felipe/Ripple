import AuthPage from "@/components/auth/page/auth";
import CodeVerification from "@/components/auth/page/codeVerification";
import { prisma } from "@/lib/prisma";

export default async function Auth({
    searchParams,
}: {
    searchParams: Promise<{ email?: string }>;
}) {

    const { email } = await searchParams;

    if (!email) 
        return <AuthPage />;


    const user = await prisma.pendingUser.findUnique({
        where: { email: email }
    });

    if (!user) 
        return <AuthPage />; 

    return <CodeVerification />;
}