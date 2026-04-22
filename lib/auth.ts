import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"
import { encode } from "next-auth/jwt"
import { randomUUID } from "crypto"

export const { signIn, signOut, auth, handlers } = NextAuth({
    adapter: PrismaAdapter(prisma),
    
    providers: [
        Credentials({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password)
                    return null;

                const user = await prisma.user.findUnique({
                    where: { email: String(credentials.email) }
                });

                if (!user) return null;

                const password = String(credentials.password);

                const valid = await bcrypt.compare(password, user.password ?? "");

                if (!valid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    emailVerified: user.emailVerified,
                };
            }
        })
    ],

    callbacks: {
        async jwt({account, token}) {
            if(account?.provider === "credentials")
                token.credentials = true;

            return token;
        },
    },

    jwt: {
        encode: async function (params) {
            if(params.token?.credentials){
                const sessionToken = randomUUID();

                if(!params.token.sub) throw Error("USER NOT FOUND")
                
                const newSession = await prisma.session.create({
                    data: {
                        userId: params.token.sub,
                        sessionToken: sessionToken,
                        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    }
                })

                if(!newSession) throw Error("INTERAL DATABSE ERROR");

                return sessionToken;
            }


            return encode(params);
        },
    }
})