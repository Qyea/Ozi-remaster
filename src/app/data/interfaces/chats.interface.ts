import { Profile } from "./profile.interface";

export interface Chat {
    id: number
    userFirst: Profile
    userSecond: Profile
    companion?: Profile
    messages: []
}

export interface Message{
    id: number
    userFromId: number
    personalChatId: number
    text: string
    createdAt: string
    isRead: boolean
    updatedAt: string
}

export interface LastMessageResponse {
    id: number
    userFrom: Profile
    message: string
}