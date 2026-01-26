"use server"

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

type Resgister = 
  | {status: false, message: string}
  | {status: true}

export async function Register({code} : {code: string}): Promise<Resgister> {
  const cookieStore = await cookies();
  
  const userCookie = cookieStore.get("pendingUser");
  if(!userCookie) return {status: false, message: "Cookie not found!"};

  const parsedUser: {email: string} = JSON.parse(userCookie.value);
  
  const pendingUser = await prisma.pendingUser.findUnique({where: {email: parsedUser.email} });
  if(!pendingUser) return {status: false, message: "User not found!" };

  const codeValid =  await bcrypt.compare(code, pendingUser.code);

  if(pendingUser.attempts <= 0 || codeValid)
    cookieStore.delete("pendingUser");
  

  if(!codeValid){
    await prisma.pendingUser.update({
      where: {email: parsedUser.email},
      data: {
        attempts: {
          decrement: 1
        }
      }
    })

    return {status: false, message: "Invalidated code!"};

  }else{
    await prisma.user.create({
      data:{
        name: pendingUser.name,
        email: pendingUser.email,
        password: pendingUser.password
      }
    })
  }
  
  return {status: true};
}