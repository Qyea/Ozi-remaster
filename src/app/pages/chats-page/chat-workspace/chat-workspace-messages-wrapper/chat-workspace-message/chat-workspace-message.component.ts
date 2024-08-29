import { Component, input } from '@angular/core'
import { Message } from '../../../../../data/interfaces/chats.interface'

@Component({
  selector: 'app-chat-workspace-message',
  standalone: true,
  imports: [],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>()
}
