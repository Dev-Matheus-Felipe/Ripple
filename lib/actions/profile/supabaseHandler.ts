'use client'

import { supabase } from "@/lib/supabase";

export async function uploadImageSupabase({file, userId}: {file: File, userId: string}){
    if(!(file instanceof File)) throw new Error("Arquivo inválido")

    const filePath = `/profilePicture/${userId}`;

    const {error} = await supabase.storage
        .from("Ripple")
        .upload(filePath, file, {
            contentType: file.type,
            cacheControl: '3600',
            upsert: true
        })

    if (error) throw new Error('Upload failed');

    const { data } = supabase.storage.from("Ripple").getPublicUrl(filePath);

    return data.publicUrl;
}