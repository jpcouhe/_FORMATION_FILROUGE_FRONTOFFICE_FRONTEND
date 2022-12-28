import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContainerComponent} from "./container/container.component";
import {LoginComponent} from "./container/login/login.component";
import {SignupComponent} from "./container/signup/signup.component";
import {GetStartedComponent} from "./container/get-started/get-started.component";
import {AuthGuardGuard} from "../shared/guards/auth-guard.guard";


const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register/get-started', component: GetStartedComponent, canActivate:[AuthGuardGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
