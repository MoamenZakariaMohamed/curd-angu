import { UsersService } from './../shared/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  userArray:userData[]=[]
  filterArray:userData[]=[]
  

  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    this.usersService.getData().subscribe((res:any)=>{
      // console.log(res)
      this.userArray=res
      this.filterArray=this.userArray
    })
  }
  
  search(event:any){
    const value=event.target.value
    console.log(value)
    this.filterArray=this.userArray.filter((user:any)=>
      user.name.toLocaleLowerCase().includes(value)
    )
    console.log(this.filterArray)
  }
 

  delete(user:userData){
    this.usersService.deleteUser(user.id).subscribe(
      data=>{
        this.filterArray=this.userArray.filter(u=>u!==user)
      }
    
    )
  }
  


}

export interface userData {
  id:number,
  name:string ,
  phone:number ,
  email:string ,
  country:string ,
  national_number:number ,
  birthday:Date,
}