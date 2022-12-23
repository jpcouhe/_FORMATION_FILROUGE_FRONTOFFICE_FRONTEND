import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./layouts/material.module";
import { FilterPipe } from './pipes/filter.pipe';



@NgModule({
  declarations: [
    FilterPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MaterialModule
  ]
})
export class SharedModule { }
