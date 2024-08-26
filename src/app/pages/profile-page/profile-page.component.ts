import { Component, inject, signal } from '@angular/core';
import {AsyncPipe} from "@angular/common"
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { PostFeedComponent } from "./post-feed/post-feed.component";
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { ChatService } from '../../data/services/chats.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [SvgIconComponent, ProfileHeaderComponent, AsyncPipe, RouterLink, ImgUrlPipe, PostFeedComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService)
  chatService = inject(ChatService)
  router = inject(Router)
  route = inject(ActivatedRoute)

  me$ = toObservable(this.profileService.me) 
  subscribers$ = this.profileService.getSubscribersShortList(5)

  isMyPage = signal<boolean>(false)

  profile$ = this.route.params
    .pipe(
      switchMap(({id})=>{
        this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id)
        if(id === 'me')return this.me$

        return this.profileService.getAccount(id)
      })
    )


    async sendMessage(userId: number){
      firstValueFrom(this.chatService.createChat(userId))
      .then((res)=>{
        this.router.navigate(['/chats', res.id])
      }) 
    }
}
