import NextAuth from "next-auth"
import { prisma } from "./prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"
import { encode } from "next-auth/jwt"
import { randomUUID } from "crypto"

export const {handlers,signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub, 
        Google, 
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Senha", type: "password" },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                
                const email = String(credentials.email);
                const password = String(credentials.password);

                const user = await prisma.user.findUnique({
                    where: {email: email}
                })

                if(!user) return null;

                const valid = await bcrypt.compare(password, user.password ?? "")
                if (!valid) return null;


                return {
                    id: user.id,
                    email: user.email,
                    emailVerified: user.emailVerified,
                }

            },
        })
    ],

     session: {
        strategy: "database", // salva sessão no banco
        maxAge: 30 * 24 * 60 * 60, // 30 dias
    },

    events: {
        async createUser({user}){
            if(!user.name || !user.email) throw Error("Data Missing");

            const firstName = user.name.split(" ")[0].slice(0,10);
            const username = firstName + "-" + randomUUID().split("-")[0];

            try{
                await prisma.user.update({
                    where: {id: user.id},
                    data: {
                        username: username
                    }
                })
            }catch{
                throw Error("DataBase Intern Error");
            }
        }
    },

    callbacks: {
        async signIn({user}){
            return (!user.email || !user.name) ? false : true;
        },
        
        async jwt({token, account}){
            if(account?.provider === "credentials"){
                token.credentials = true;
            }

            return token;
        },

        async session({ session, user }) {
            if (user) {
                session.user = {
                    id: user.id,
                    email: user.email,
                    emailVerified: user.emailVerified,
                };
            }
            return session;
        },
    },



    jwt: {
        encode: async function (params) {
            if(params.token?.credentials){
                const sessionToken = uuid();

                if(!params.token.sub) throw new Error("No used id found");

                const createdSession = await prisma.session.create({
                    data: {
                        sessionToken: sessionToken,
                        userId: params.token.sub,
                        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    }
                })

                if(!createdSession) throw new Error("Failed to create session");

                return sessionToken;
            }

            return encode(params);
        }
    }
});