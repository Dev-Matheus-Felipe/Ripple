'use client'

import { supabase } from "@/lib/supabase"


export async function uploadToSupabase(file: File) {
  const filePath = `posts/${crypto.randomUUID()}`

  const { error } = await supabase.storage
    .from('Ripple')
    .upload(filePath, file, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error(error)
    throw new Error('Upload failed')
  }

  const { data } = supabase.storage
    .from('Ripple')
    .getPublicUrl(filePath)

  return {
    url: data.publicUrl,
    type: file.type,
  }
}
