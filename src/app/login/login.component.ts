import { AuthService } from './../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private route:ActivatedRoute
  ) { 
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[ Validators.required,Validators.email]],
      password: ['', [Validators.required]]
  });
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.loginForm.controls; }

  onSubmit(){
    // this.submitted=true;
    // if (this.loginForm.invalid) {
    //   return;
    // }
    // this.loading=true;
    // this.authService.login(this.f['name'].value, this.f['password'].value)
    // .pipe (first())
    // .subscribe(
    //   data=>{
    //     this.router.navigate(['/user-info'])
    //   },
    //   error => {
    //     this.error = error;
    //     // this.loading = false;
    //   }); 
      this.submitted=true
      this.authService.login(this.loginForm.value)
  }
}
