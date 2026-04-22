"use server"

import { prisma } from "@/lib/prisma";
import { RegisterDataType, RegisterSchema } from "../validators/registerSchema"
import { randomUUID } from "crypto";
import { EmailTemplate } from "@/components/emailTemplate/emailTemplate";
import { Resend } from "resend";
import bcrypt from "bcryptjs";

const resend = new Resend(process.env.RESEND_API_KEY);

export const validateEmail = async(data: RegisterDataType) => {
    const result = RegisterSchema.safeParse(data);

    if(!result.success)
        return {sucess: false, message: result.error.message};

    const [pending, user] = await Promise.all([
        prisma.pendingUser.findFirst({ where: { email: data.email } }),
        prisma.user.findFirst({ where: { email: data.email } })
    ])

    if(pending || user)
        return {sucess: false, message: "Email already used!"};

    const code = randomUUID().split("-")[0].slice(0, 6).toLocaleLowerCase();
    const hashCode = await bcrypt.hash(code, 10);

    const hashPassword = await bcrypt.hash(data.password, 15);

    try {
        const pendingUser = await prisma.pendingUser.create({
            data: {
                expiresAt: new Date(Date.now() + 1000 * 60 * 5),
                name: data.name,
                email: data.email,
                password: hashPassword,
                attempts: 3,
                code: hashCode

            }
        })

        const { data : resendData, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["rippleproject74@gmail.com"],
            subject: "Ripple Validation Code",
            react: EmailTemplate({
                firstName: data.name,
                code: code,
            }),
        });

        if (error) {
            await prisma.pendingUser.delete({
                where: { id: pendingUser.id }
            });

            return { success: false, message: "Code Sender Error" };
        }
            
        
        return {sucess: true, message: "Code created sucessfully", email: data.email}

    } catch (error) {
        return {sucess: false, message: "Interal Server Error"}
    }

}