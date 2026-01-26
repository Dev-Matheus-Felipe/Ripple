'use server'

import { PostSchema } from './zodPost'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { newPostType } from '@/components/forms/createPost'
import { supabaseServer } from '@/lib/supabase/server'
import { GetUniquePost } from '../post/getPosts'

export async function NewPostAction({
  preview,
  data,
}: {
  preview: { file: string; type: string, width: number, height: number }
  data: newPostType
}) {

  const validated = PostSchema.safeParse(data);

  if (!validated.success) 
    return { status: false, message: 'Invalid data' };
  

  const session = await auth();

  if (!session?.user?.id) 
    return { status: false, message: 'Unauthorized' };
  

  try {
    const newPost = await prisma.post.create({
      data: {
        ...validated.data,
        visual: preview.file,
        visualType: preview.type,
        sizeX: preview.width,
        sizeY: preview.height,
        authorId: session.user.id,
      },
    })

    const fullPost = await GetUniquePost({id: newPost.id })

    // backend — enviar evento (depois de salvar no MongoDB)
  await supabaseServer
    .channel(`post`)
    .send({
      type: "broadcast",
      event: "new-message",
      payload: fullPost,
    })


    return { status: true };
    
  } catch (error) {

    return { status: false, message: 'Database error' };
  }
}
