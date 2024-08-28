/* eslint-disable @angular-eslint/component-selector */
import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from "../../../common-ui/avatar-circle/avatar-circle.component";
import { LastMessageResponse } from '../../../data/interfaces/chats.interface';

@Component({
  selector: 'button[chats]',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss'
})
export class ChatsBtnComponent {
  chat = input<LastMessageResponse>()
}
