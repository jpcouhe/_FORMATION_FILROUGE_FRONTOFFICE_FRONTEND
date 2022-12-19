import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContainerComponent} from "./container/container.component";
import {LoginComponent} from "./container/login/login.component";
import {SignupComponent} from "./container/signup/signup.component";


const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: SignupComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
