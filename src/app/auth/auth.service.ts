import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { TokenResponse } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)

  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/'

  token: string | null = null
  refreshToken: string | null = null

  get isAuth(){
    return !!this.token
  }

  login(payload: {username:string, password: string}){
    const formData = new FormData()

    formData.append('username', payload.username)
    formData.append('password', payload.password)

    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`, formData).pipe(
      tap(val=>{
        this.token = val.access_token
        this.refreshToken = val.refresh_token
      })
    )
  }
}
