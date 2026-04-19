import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { signIn, signOut, auth, handlers } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    type: "email",
                    label: "Type your email here"
                },

                password: {
                    type: "password",
                    label: "Your password comes here"
                }

            },

            async authorize(credentials, request) {
                return {
                    email: credentials.email as string,
                    password: credentials.password as string
                }
            },
        })
    ]
})