import { Component, inject, Renderer2 } from '@angular/core';
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe';
import { ProfileService } from '../../../data/services/profile.service';
import { AvatarCircleComponent } from "../../../common-ui/avatar-circle/avatar-circle.component";

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [ImgUrlPipe, AvatarCircleComponent],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  r2 = inject(Renderer2)
  profileService = inject(ProfileService)

  profile = this.profileService.me

  onTextAreaInput(event: Event){
    const textarea = event.target as HTMLTextAreaElement

    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }
}
