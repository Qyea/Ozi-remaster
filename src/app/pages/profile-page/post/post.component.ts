import { Component, input } from '@angular/core';
import { Post } from '../../../data/interfaces/post.interface';
import { AvatarCircleComponent } from "../../../common-ui/avatar-circle/avatar-circle.component";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  post = input<Post>()
}
