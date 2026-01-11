"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt";
import crypto from "crypto";
import { cookies } from "next/headers";

const SALT_ROUNDS = 12;

export async function ResgisterCode(data: {email: string, password: string, name: string}){
    const pendingUser = await prisma.pendingUser.findUnique({
        where: {email: data.email}
    })

    if(pendingUser) return false;

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const code = crypto.randomBytes(3).toString("hex").toUpperCase();
    const codeHash = await bcrypt.hash(code, 10);

    try{
        await prisma.pendingUser.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                attempts: 3,
                code: codeHash,
                expiresAt:  new Date(Date.now() + 15 * 60)
            }
        })

        const cookieStore =  await cookies();

        cookieStore.set("pendingUser", JSON.stringify({ email: data.email }), {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 15 * 60,
        });

        return true;

    }catch(e){
        
        return false;
    }
}