import {
  Component,
  EventEmitter,
  inject,
  Output,
  Renderer2,
} from '@angular/core'
import { ProfileService } from '../../data/services/profile.service'
import { AvatarCircleComponent } from '../avatar-circle/avatar-circle.component'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [AvatarCircleComponent, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  r2 = inject(Renderer2)
  me = inject(ProfileService).me

  messageText = ''

  @Output() created = new EventEmitter<string>()

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement

    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  onCreatePost() {
    if (!this.messageText) return

    this.created.emit(this.messageText)
    this.messageText = ''
  }
}
