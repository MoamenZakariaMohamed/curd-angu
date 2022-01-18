import { AuthService } from './auth.service';
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable}from 'rxjs'


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private injector:Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
          // add authorization header with jwt token if available
// let authservice=this.injector.get(AuthService)

// let tokenReq = request.clone({
//      headers:request.headers.set(TOKEN_HEADER_KEY,'Barer'+authservice.getToken())
// })
const idToken=localStorage.getItem("access_token")
if(idToken){
  const cloned=request.clone({
    headers:request.headers.set('Authorization',"Bearer"+idToken)})
  return next.handle(cloned)
}else{
    return next.handle(request);
  }
}
}

