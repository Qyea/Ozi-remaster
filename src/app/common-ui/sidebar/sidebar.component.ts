import { Component, inject } from '@angular/core';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { SubscriberCardComponent } from "./subscriber-card/subscriber-card.component";
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import {AsyncPipe} from "@angular/common";
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, SubscriberCardComponent, RouterModule, AsyncPipe, ImgUrlPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',

})
export class SidebarComponent {
  profileService = inject(ProfileService)

  subscribers$ = this.profileService.getSubscribersShortList()

  me = this.profileService.me

  menuItems = [
    {
      label: 'My page',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Chats',
      icon: 'chats',
      link: 'chats',
    },
    {
      label: 'Search',
      icon: 'search',
      link: 'search',
    }
  ]

  ngOnInit(){
    firstValueFrom(this.profileService.getMe())
  }
}
