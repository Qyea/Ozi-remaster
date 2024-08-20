import { Profile } from "./profile.interface"

export interface PostCreateDto{
    title: string
    content: string
    authorId: number
}

export interface Post {
    id: number
    title: string
    content: string
    author: Profile
    images: string[]
    createdAt: Date
    updatedAt: Date
    comments: Comment[]
}

export interface Comment {
    id: number
    text: string
    author: {
        id: number
        username: string
        avatarUrl: string
        subscribersAmount: number
    },
    postId: number
    commentId: number
    createdAt: Date
    updatedAt: Date
}
export interface CommentCreateDto {
    text: string
    authorId: number
    postId: number
    //commentId: number
}