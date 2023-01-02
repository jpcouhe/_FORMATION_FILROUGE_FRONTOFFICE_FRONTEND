import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FeaturesContainerComponent} from "./features-container/features-container.component";
import {UsersListComponent} from "./users-list/users-list.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {ManageAuthorizationComponent} from "./manage-authorization/manage-authorization.component";
import {AuthGuardGuard} from "../shared/guards/auth-guard.guard";

const routes: Routes = [
  {
    path:'',
    component: FeaturesContainerComponent,
    canActivate:[AuthGuardGuard],
    children: [
      {
        path: "calendar/authorization",
        component: ManageAuthorizationComponent
      },
      {
        path: "calendar/:id",
        component:CalendarComponent
      },
      {
        path:"calendar",
        component: CalendarComponent,
      },
      {
        path: "users",
        component: UsersListComponent
      }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export  class FeaturesRoutingModules {}
