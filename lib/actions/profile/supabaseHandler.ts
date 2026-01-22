'use client'

import { supabase } from "@/lib/supabase"

export async function uploadImageSupabase({
  file,
  userId,
}: {
  file: File
  userId: string
}) {
  if (!(file instanceof File)) {
    throw new Error("Arquivo inválido")
  }

  const filePath = `profilePicture/${userId}`
  const bucket = supabase.storage.from("Ripple")

  let { error } = await bucket.upload(filePath, file, {
    contentType: file.type,
    cacheControl: "3600",
  })

  if (error) {
    const updateResult = await bucket.update(filePath, file, {
      contentType: file.type,
      cacheControl: "3600",
    })

    if (updateResult.error) {
      console.error(updateResult.error)
      throw updateResult.error
    }
  }

  const { data } = bucket.getPublicUrl(filePath)

  return `${data.publicUrl}?t=${Date.now()}`
}
