import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatMenuModule
  ],
  exports:[HeaderComponent]
})
export class CoreModule { }
