import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';

let isRefreshing = false

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const token = authService.token

  if(!token) return next(req)

  if(isRefreshing) {
    return refreshAndProceed(authService, req, next)
  }

  return next(addToken(req, token)).pipe(
    catchError(error => {
        if(error.status === 403){
            return refreshAndProceed(authService, req, next)
        }

        return throwError(error)
    })
  )
}

const refreshAndProceed = (
    authService: AuthService,
    req : HttpRequest<any>, 
    next: HttpHandlerFn) =>{
    if(!isRefreshing){
      isRefreshing =  true
      return authService.refreshAuthToken().pipe(
        switchMap( (res: TokenResponse) => {
            isRefreshing = false
            return next(addToken(req, res.access_token))
        })
      )
    }
    return next(addToken(req, authService.token!))
}

const addToken = (req : HttpRequest<any>, token : string)=>{
    return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
    })
}