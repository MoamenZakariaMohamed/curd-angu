import { Router } from '@angular/router';
import {  Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/user.';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http:HttpClient,private router:Router) { }

//sign-up

  register(user:User){
    return this.http.post<any>(`${environment.apiUrl}/auth/register`,user)
  }

  //login 

  login(user:User){
    return this.http.post<User>(`${environment.apiUrl}/auth/login`,user)
              .subscribe((res:any)=>{
                localStorage.setItem("access_token", JSON.stringify(res.access_token))
                console.log(localStorage.setItem("access_token",JSON.stringify(res.access_token)))
                this.router.navigate(['/user-info'])
          })
         }
      

  getToken() {
    return localStorage.getItem("access_token");
  }

  get isLoggedIn():boolean{
    let authToken=localStorage.getItem("access_token");
    return(authToken!=null)?true:false;
  }

  //logout            
  logout() {
      // remove user from local storage to log user out
      let removeToken =localStorage.removeItem("access_token");
    if (removeToken==null) {
      this.router.navigate(['/login'])
    }
    }
loggedIn() { 
  return !!localStorage.getItem("access_token")    
  }



}
