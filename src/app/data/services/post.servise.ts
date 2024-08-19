import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Post, PostCreateDto } from "../interfaces/post.interface";
import { Profile } from "../interfaces/profile.interface";
import { switchMap, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PostService {
    #http = inject(HttpClient)
    baseApiUrl = 'https://icherniakov.ru/yt-course/'

    posts = signal<Post[]>([])

    createPost(payload: PostCreateDto){
        return this.#http.post<Profile>(`${this.baseApiUrl}post/`, payload)
            .pipe(switchMap(()=>{
                return this.fetchPosts()
            }))
    }

    fetchPosts(){
        return this.#http.get<Post[]>(`${this.baseApiUrl}post/`)
        .pipe(
            tap(res => this.posts.set(res))
        )
    }
}