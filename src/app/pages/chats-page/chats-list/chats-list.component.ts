import { Component, inject } from '@angular/core'
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component'
import { ChatService } from '../../../data/services/chats.service'
import { AsyncPipe } from '@angular/common'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { map, startWith, switchMap } from 'rxjs'

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [
    ChatsBtnComponent,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
})
export class ChatsListComponent {
  chatsService = inject(ChatService)

  filterChatsControl = new FormControl('')

  chats$ = this.chatsService.getMyChats().pipe(
    switchMap(chats => {
      console.log(chats)
      return this.filterChatsControl.valueChanges.pipe(
        startWith(''),
        map(inputValue => {
          return chats.filter(chat => {
            console.log(inputValue)
            return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
              .toLowerCase()
              .includes(inputValue?.toLocaleLowerCase() ?? '')
          })
        })
      )
    })
  )
}
