import { Component, inject, input, Renderer2 } from '@angular/core';
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe';
import { ProfileService } from '../../../data/services/profile.service';
import { AvatarCircleComponent } from "../../../common-ui/avatar-circle/avatar-circle.component";
import { PostService } from '../../../data/services/post.servise';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [ImgUrlPipe, AvatarCircleComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  isCommentInput = input(false)
  r2 = inject(Renderer2)
  postService = inject(PostService)
  profileService = inject(ProfileService)

  profile = this.profileService.me

  postText = ''

  onTextAreaInput(event: Event){
    const textarea = event.target as HTMLTextAreaElement

    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  onCreatePost() {
    if(!this.postText) return

    if(this.isCommentInput()){
      firstValueFrom(
        this.postService.createPost({
          title: 'Some post',
          content: this.postText,
          authorId: this.profile()!.id
        })
      ).then(()=>{
        this.postText = ''
      })
      return
    }

    firstValueFrom(
      this.postService.createPost({
        title: 'Some post',
        content: this.postText,
        authorId: this.profile()!.id
      })
    ).then(()=>{
      this.postText = ''
    })
  }
}
