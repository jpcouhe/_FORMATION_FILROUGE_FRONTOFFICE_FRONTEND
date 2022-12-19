import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FeaturesContainerComponent} from "./features-container/features-container.component";

const routes: Routes = [
  {
    path:'',
    component: FeaturesContainerComponent
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export  class FeaturesRoutingModules {}
