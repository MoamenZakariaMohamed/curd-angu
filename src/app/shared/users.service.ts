import { Observable,BehaviorSubject  } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  addUser(body:any):Observable<any>{
    return this.http.post("https://61e4587b1a976f00176ee433.mockapi.io/users",body)
  
  }
  getData(){
    return this.http.get("https://61e4587b1a976f00176ee433.mockapi.io/users")
};
api="https://61e4587b1a976f00176ee433.mockapi.io/users/";

  deleteUser(id:number){
   return  this.http.delete(this.api+id)
  }
  getUserById(id:number){
    return this.http.get(this.api+id)
  }
  editUser(body:any,id:number):Observable<any>{
    return this.http.put(this.api+id,body)
    
  }
  findByName(name:string):Observable<any>{
    return this.http.get(`${this.api}?title=${name}`)
  }
}
