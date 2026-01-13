import z4 from "zod/v4";

export const registerSchema = z4.object({
    email: z4.email("Not a email"),

    name: z4
        .string("Not a valid name")
        .min(4, "Min Length: 4")
        .max(30, "Max Length: 30")
        .regex(/^[a-zA-Z]+( [a-zA-Z]+)*$/),

    password: z4
        .string("not a valid password")
        .min(10,"Min Length: 10")
        .max(20, "Max Length: 20")
        .regex(/^[a-zA-Z0-9]+$/)
})


export type registerType = z4.infer<typeof registerSchema>;