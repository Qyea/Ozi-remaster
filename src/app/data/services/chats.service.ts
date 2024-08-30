import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import {
  Chat,
  LastMessageResponse,
  Message,
} from '../interfaces/chats.interface'
import { ProfileService } from './profile.service'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  http = inject(HttpClient)
  me = inject(ProfileService).me

  activeChatMessages = signal<Message[]>([])

  baseUrl = 'https://icherniakov.ru/yt-course/'
  chatUrl = `${this.baseUrl}chat/`
  messageUrl = `${this.baseUrl}message/`

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatUrl}${userId}`, {})
  }

  getMyChats() {
    return this.http.get<LastMessageResponse[]>(`${this.chatUrl}get_my_chats/`)
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatUrl}${chatId}`).pipe(
      map(chat => {
        const patchMessages = chat.messages.map((message: Message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          }
        })

        this.activeChatMessages.set(patchMessages)

        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()?.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchMessages,
        }
      })
    )
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<Message>(
      `${this.messageUrl}send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      }
    )
  }
}
