import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'user-info',pathMatch:'full'},
  {path:'user-info',component:UserInfoComponent , canActivate:[AuthGuard]},
  {path:'user-list',component:ListUsersComponent,canActivate:[AuthGuard]},
  {path:'edit-user/:id',component:UserInfoComponent,canActivate:[AuthGuard]},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
