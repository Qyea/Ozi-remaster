import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { PostComment, CommentCreateDto, Post, PostCreateDto } from "../interfaces/post.interface";
import { Profile } from "../interfaces/profile.interface";
import { map, switchMap, tap } from "rxjs";

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

    createComment(payload: CommentCreateDto){
        return this.#http.post<PostComment>(`${this.baseApiUrl}comment/`, payload)
    }

    getCommentsByPostId(postId: number){
        return this.#http.get<Post>(`${this.baseApiUrl}post/${postId}`)
            .pipe(
                map(res => res.comments)
            )
    }
}