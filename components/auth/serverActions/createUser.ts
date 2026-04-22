"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs";

export default async function createUser(code: string, email: string){
    const pendingUser = await prisma.pendingUser.findUnique({
        where: {email: email}
    })

    if(!pendingUser)
        return {sucess: false, message: "Invalid Email, User not found"};


    const codeVerified = await bcrypt.compare(code.toLocaleLowerCase(),pendingUser.code);

    if(!codeVerified){
        await prisma.pendingUser.update({
            where: {email: pendingUser.email},
            data: {
                attempts: {
                    decrement: 1
                }
            }
        })

        if(pendingUser.attempts - 1 === 0){
            await prisma.pendingUser.delete({where: {id: pendingUser.id}})
            return {sucess: false, message: "Maximun attempts reached, please try creating the account again"};
        }

        return {sucess: false, message: "Invalid code"};
    }

    try {
        await prisma.pendingUser.delete({where: {id: pendingUser.id}});

        await prisma.user.create({
            data: {
                name: pendingUser.name,
                email: pendingUser.email,
                password: pendingUser.password
            }
        })

        return {sucess: true, message: "User created successfully"};

    } catch (error) {
        return {sucess: false, message: "Internal Database Error"};
    }
}