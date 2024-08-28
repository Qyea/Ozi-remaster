import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Chat, LastMessageResponse, Message } from "../interfaces/chats.interface";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    http = inject(HttpClient)
    baseUrl = 'https://icherniakov.ru/yt-course/'
    chatUrl = `${this.baseUrl}chat/`
    messageUrl = `${this.baseUrl}message/`

    createChat(userId: number){
        return this.http.post<Chat>(`${this.chatUrl}${userId}`, {})
    }

    getMyChats(){
        return this.http.get<LastMessageResponse[]>(`${this.chatUrl}get_my_chats/`)
    }

    getChatById(chatId: number){
        return this.http.get<Chat>(`${this.chatUrl}${chatId}`)
    }

    sendMessage(chatId: number, message: string){
        return this.http.post<Message>(`${this.messageUrl}${chatId}`,{},{
            params:{
                message
            }
        })
    }
}