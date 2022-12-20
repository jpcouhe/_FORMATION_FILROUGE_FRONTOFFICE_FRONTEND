import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './container/login/login.component';
import { SignupComponent } from './container/signup/signup.component';
import { ContainerComponent } from './container/container.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GetStartedComponent } from './container/get-started/get-started.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ContainerComponent,
    GetStartedComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
