import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { UsersService } from './../shared/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
 
  constructor(private usersService:UsersService,private formBuilder:FormBuilder,private route:ActivatedRoute) { }
 countries=["Egypt",'Saudi','Qater','Morroco']
 addForm:FormGroup;
userId:number;
editMode=false;
success=false

  ngOnInit(): void {
//     this.userId=this.route.snapshot.params['id'];
// console.log(this.userId)
this.route.params.subscribe((params:Params)=>{
  this.userId=+params['id'];
  // console.log(this.userId)
  // this.editMode=params['id']!=null;
  if (this.userId) {
    this.editMode=true
  }
})

    this.addForm=this.formBuilder.group({
        name:new FormControl(null,[Validators.required]),
        phone:new FormControl(null,[Validators.required]),
        email:new FormControl(null,[Validators.required,Validators.email]),
        password:new FormControl(null,[Validators.required]),
        country:new FormControl(null,[Validators.required]),
        national_number:new FormControl(null,[Validators.required]),
        birthday:new FormControl(null,[Validators.required]),
        can_edit:new FormControl(null,[Validators.required]),
        can_view:new FormControl(null,[Validators.required]),

    })
    this.getUser()
  }

  onSubmit(){
    console.log(this.addForm.value)
    this.usersService.addUser(this.addForm.value).subscribe(
      data=>{
      // console.log(data)
      }
    )
    this.onClear()
    this.success=true
  }
  onClear(){
    this.addForm.reset()
  }
  getUser(){
    this.usersService.getUserById(this.userId).subscribe(
      res=>{
        // console.log(res)
        this.addForm.patchValue(res)
      }
    )
  }
  updateUsr(){
    this.usersService.editUser(this.addForm.value,this.userId).subscribe(
      // result=>{
      //   console.log(result)
      // }
    )
    this.onClear()
    this.success=true
  }
}
