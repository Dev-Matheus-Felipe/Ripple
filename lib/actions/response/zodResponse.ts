import z4 from "zod/v4";

export const responseSchema = z4.object({
    response: z4.string().max(200, "Max length: 200")
})