import { Component, inject } from '@angular/core';
import {AsyncPipe} from "@angular/common"
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileHeaderComponent, AsyncPipe, RouterLink, ImgUrlPipe],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)

  me$ = toObservable(this.profileService.me) 

  subscribers$ = this.profileService.getSubscribersShortList(5)

  profile$ = this.route.params
    .pipe(
      switchMap(({id})=>{
        if(id==='me')return this.me$

        return this.profileService.getAccount(id)
      })
    )
}
