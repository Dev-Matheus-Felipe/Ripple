export type ResponseAuthor = {
  id: string
  username: string | null
  image: string | null
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
  name: string | null
  username: string | null
  image: string | null
  email: string
  bio: string | null
  followers: string[]
  following: string[]
  savedPosts: SavedPost[]
  posts: Post[]
}
