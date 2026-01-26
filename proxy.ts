import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { redirect } from "next/dist/server/api-utils";

export default async function proxy(request: NextRequest){
    const session = await auth();

    
  /**
      
    return (request.nextUrl.pathname == "/login")
        ? session
            ? NextResponse.redirect(new URL("/", request.nextUrl))
            : NextResponse.next()
        
        : session
            ? NextResponse.next()
            : NextResponse.redirect(new URL("/login", request.nextUrl))

    

   */
}


export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|\\.well-known).*)',
  ],
}
