import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesContainerComponent } from './features-container/features-container.component';
import {FeaturesRoutingModules} from "./features-routing.modules";
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";



@NgModule({
  declarations: [
    FeaturesContainerComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModules,
    SharedModule,
    CoreModule
  ]
})
export class FeaturesModule { }
