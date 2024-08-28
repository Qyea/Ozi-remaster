import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Chat, LastMessageResponse, Message } from "../interfaces/chats.interface";
import { ProfileService } from "./profile.service";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    http = inject(HttpClient)
    me = inject(ProfileService).me

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
        .pipe(
            map((chat)=>{
                return{
                    ...chat,
                    companion: chat.userFirst.id === this.me()?.id ? chat.userSecond : chat.userFirst
                }
            })
        )
    }

    sendMessage(chatId: number, message: string){
        return this.http.post<Message>(`${this.messageUrl}${chatId}`,{},{
            params:{
                message
            }
        })
    }
}