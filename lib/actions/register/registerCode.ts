"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt";
import crypto from "crypto";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { registerSchema } from "./zodRegister";

type ResgisterCode = 
  | {status: false, message: string}
  | {status: true}

const SALT_ROUNDS = 12;

export async function ResgisterCode(data : {email: string, password: string, name: string} ): Promise<ResgisterCode>{
    const validatedData = registerSchema.safeParse(data);

    if(validatedData.error) return {status: false, message: "Invalidated data"};
    
    const pendingUser = await prisma.pendingUser.findUnique({
        where: {email: validatedData.data.email}
    })

    const user = await prisma.user.findUnique({
        where: {email: validatedData.data.email}
    })

    if(pendingUser || user) return {status: false, message: "Already exists someone with this email!"};

    const hashedPassword = await bcrypt.hash(validatedData.data.password, SALT_ROUNDS);

    const code = crypto.randomBytes(3).toString("hex").toUpperCase();
    const codeHash = await bcrypt.hash(code, 10);

    try{
        await prisma.pendingUser.create({
            data: {
                name: validatedData.data.name,
                email: validatedData.data.email,
                password: hashedPassword,
                attempts: 3,
                code: codeHash,
                expiresAt:  new Date(Date.now() + 5 * 60 * 1000)
            }
        })

        const cookieStore =  await cookies();

        cookieStore.set("pendingUser", JSON.stringify({ email: validatedData.data.email }), {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 5 * 60,
        });

        
        const resend = new Resend(process.env.RESEND);

        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['rippleproject74@gmail.com'],
            subject: 'Código de verificação - Ripple',
            html: `<p>Seu código é: <strong>${code}</strong></p>`,
        });
         

        return {status: true};
    }catch(e){

        return {status: false, message: "Something went wrong, please try again later!"};
    }
}