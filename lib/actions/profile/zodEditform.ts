import z4 from "zod/v4";


const FileTypes = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
] as const


const imageSchema = z4.union([
  z4.string(), 
  z4
    .file()
    .refine(
      (file) => FileTypes.includes(file.type as (typeof FileTypes)[number]),
      { message: "The image must be PNG, JPG, JPEG ou WEBP" }
    ),
])


export const EditFormSchema = z4.object({
    name: z4.string().max(20, "Max Length: 20").regex(/^[a-zA-Z]+( [a-zA-Z]+)*$/, "Invalidated name"),
    username: z4.string().max(16, "Max Length: 16").regex(/^[a-z]+(-[a-z0-9]+)*$/, "Invalidated username"),
    image: imageSchema,
    bio: z4
      .string()
      .max(150, "Max Length: 150")
      .regex(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/, "Invalidated bio")
      .optional()
      .or(z4.literal(""))
})



export type EditFormType = z4.infer<typeof EditFormSchema>;


export const EditFormPayloadSchema = z4.object({
  name: z4.string().max(20),
  username: z4.string().max(20),
  bio: z4.string().max(150).optional(),
  image: z4.string().nullable(),
})

export type EditFormPayload = z4.infer<typeof EditFormPayloadSchema>
