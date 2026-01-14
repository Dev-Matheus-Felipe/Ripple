'use server'

import { PostSchema } from './zodPost'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { newPostType } from '@/components/forms/createPost'

export async function NewPostAction({
  preview,
  data,
}: {
  preview: { file: string; type: string }
  data: newPostType
}) {

  const validated = PostSchema.safeParse(data);

  if (!validated.success) 
    return { status: false, message: 'Invalid data' };
  

  const session = await auth();

  if (!session?.user?.id) 
    return { status: false, message: 'Unauthorized' };
  

  try {
    await prisma.post.create({
      data: {
        ...validated.data,
        visual: preview.file,
        authorId: session.user.id,
      },
    })

    return { status: true };
  } catch (error) {

    return { status: false, message: 'Database error' };
  }
}
