export type ResponseAuthor = {
  id: string
  username: string | null
  image: string | null
}


export type UserPostResponse = {
  id: string
  content: string
  createdAt: Date
  likes: string[]
  postId: string
  authorId: string
  author: ResponseAuthor
}


export type Post = {
  id: string
  description: string
  visual: string
  visualType: string
  sizeX: number
  sizeY: number
  tags: string[]
  createdAt: Date
  authorId: string
  likes: string[]
  responses: UserPostResponse[]
}

export type SavedPost = {
  id: string
  userId: string
  postId: string
  createdAt: Date
  post: {
    id: string
    description: string
    visual: string
    visualType: string
    sizeX: number
    sizeY: number
    tags: string[]
    createdAt: Date
    authorId: string
    likes: string[]
  }
}


export type MyProfileData = {
  name: string
  username: string | null
  image: string | null
  email: string
  bio: string | null
  followers: string[]
  following: string[]
  savedPosts: SavedPost[]
  posts: Post[]
}
