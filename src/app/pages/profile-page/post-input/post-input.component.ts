import { Component, inject } from '@angular/core';
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe';
import { ProfileService } from '../../../data/services/profile.service';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  profileService = inject(ProfileService)

  me = this.profileService.me
}
