import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core'
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe'
import { ProfileService } from '../../../data/services/profile.service'
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component'
import { PostService } from '../../../data/services/post.serviсe'
import { FormsModule } from '@angular/forms'
import { firstValueFrom } from 'rxjs'

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [ImgUrlPipe, AvatarCircleComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  r2 = inject(Renderer2)
  postService = inject(PostService)
  profileService = inject(ProfileService)

  isCommentInput = input(false)
  postId = input<number>(0)
  profile = this.profileService.me

  postText = ''

  @Output() created = new EventEmitter()

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput()
  }

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement

    this.r2.setStyle(textarea, 'height', 'auto')
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px')
  }

  onCreatePost() {
    if (!this.postText) return

    if (this.isCommentInput()) {
      firstValueFrom(
        this.postService.createComment({
          text: this.postText,
          authorId: this.profile()!.id,
          postId: this.postId(),
        })
      ).then(() => {
        this.postText = ''
        this.created.emit()
      })
      return
    }

    firstValueFrom(
      this.postService.createPost({
        title: 'Some post',
        content: this.postText,
        authorId: this.profile()!.id,
      })
    ).then(() => {
      this.postText = ''
    })
  }
}
