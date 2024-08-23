import { Component, input } from '@angular/core';
import { PostComment } from '../../../../data/interfaces/post.interface';
import { AvatarCircleComponent } from '../../../../common-ui/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../../../../helpers/pipes/time-ago.pipe';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe, TimeAgoPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
comment = input<PostComment>()
}
