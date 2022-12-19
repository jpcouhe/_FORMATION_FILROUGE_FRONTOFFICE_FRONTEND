import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesContainerComponent } from './features-container/features-container.component';
import {FeaturesRoutingModules} from "./features-routing.modules";



@NgModule({
  declarations: [
    FeaturesContainerComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModules
  ]
})
export class FeaturesModule { }
