import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { PostCreateDto } from "../interfaces/post.interface";
import { Profile } from "../interfaces/profile.interface";

@Injectable({
    providedIn: 'root'
})

export class PostService {
    #http = inject(HttpClient)
    baseApiUrl = 'https://icherniakov.ru/yt-course/'

    createPost(payload: PostCreateDto){
        return this.#http.post<Profile>(`${this.baseApiUrl}post/`, payload)
    }
}