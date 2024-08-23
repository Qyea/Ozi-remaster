import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Post, PostComment } from '../../../data/interfaces/post.interface';
import { AvatarCircleComponent } from "../../../common-ui/avatar-circle/avatar-circle.component";
import { DatePipe } from "@angular/common";
import { PostInputComponent } from '../post-input/post-input.component';
import { CommentComponent } from './comment/comment.component';
import { PostService } from '../../../data/services/post.servise';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe, PostInputComponent, CommentComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  post = input<Post>()

  comments = signal<PostComment[]>([])

  postService = inject(PostService)

  async ngOnInit(): Promise<void> {
    this.comments.set(this.post()!.comments)
  }
  async onCreated(){
    const comments = await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id)) 

    this.comments.set(comments)
  }
}
