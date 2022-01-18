import { AuthService } from './../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  submitted:boolean;
  loading:boolean;

  constructor(private fb:FormBuilder,
              private router:Router,
              private authService:AuthService,
              public toster:ToastrService) { }

  ngOnInit(): void {
    this.signupForm=this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(7)]]
    })
  }
  //coveience getter for easy avvess to form fields
get f(){return this.signupForm.controls}

onSubmit(){
  this.submitted=true;
  if(this.signupForm.invalid){
    return;
  }
  this.loading=true;
  this.authService.register(this.signupForm.value)
    .subscribe((res)=>{
      this.toster.success('Signup Successefully','Success');
      console.log(res);
               localStorage.setItem('access_token',res.access_token)
               this.router.navigate(['/user-list'])
      this.signupForm.reset()
    },
    error=>{
      this.toster.error(error,'Error');
      this.loading=false;
    }
  )
  
}
}
