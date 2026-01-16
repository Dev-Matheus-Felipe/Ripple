export type User = {
  username: string | null;
  image: string | null;
  followers: string[]
}

export type ResponseAuthor = {
  id: string,
  username: string | null,
  image: string | null
}

export type Response = {
  id: string,
  content: string,
  createdAt: Date,
  likes: string[],
  postId: string,
  authorId: string,

  author: ResponseAuthor  
}

export type Post = {
  id: string,
  description: string,     
  visual: string,  
  visualType: string
  sizeX: number,
  sizeY: number,
  tags: string[],
  createdAt: Date,
  authorId: string,
  likes: string[],  

  author: User, 
  responses: Response[]  
}