import z from "zod"

export const RegisterSchema = z.object({
    name: z
    .string()
    .min(3, "Name is too short")
    .max(35, "Please shorten your name to continue"),

    email: z
        .email(),

    password: z
        .string()
        .min(8, "Password must contain at least 8 characters")
        .max(20,"Password can not include more than 20 characters")
        .regex(/[A-Z]/, "Must include at least one uppercase letter")
        .regex(/[0-9]/, "Must include at least one number")
})


export type RegisterDataType = z.infer<typeof RegisterSchema>;