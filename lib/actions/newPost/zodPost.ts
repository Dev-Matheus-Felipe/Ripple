import z from "zod";

export const PostSchema = z.object({
    description: z
        .string()
        .min(10, "Min Length: 10")
        .max(50,"Max Length: 50")
        .regex(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/,"Invalidated description"),
        
    tags: z
        .array( z
            .string()
            .regex(/^[a-zA-Z0-9]{3,10}(-[a-zA-Z0-9]{3,10})?$/, "Invalid tag format")
        )
        .min(1, "Min 1 tag")
        .max(3, "Max 3 tags"),
})
