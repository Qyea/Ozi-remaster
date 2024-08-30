import { Component, inject } from '@angular/core'
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component'
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component'
import { MessageInputComponent } from '../../../common-ui/message-input/message-input.component'
import { ActivatedRoute } from '@angular/router'
import { ChatService } from '../../../data/services/chats.service'
import { switchMap } from 'rxjs'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    MessageInputComponent,
    AsyncPipe,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute)
  chatsService = inject(ChatService)

  activeChats$ = this.route.params.pipe(
    switchMap(({ id }) => this.chatsService.getChatById(id))
  )
}
