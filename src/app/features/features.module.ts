import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesContainerComponent } from './features-container/features-container.component';
import {FeaturesRoutingModules} from "./features-routing.modules";
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";
import { ProfilComponent } from './profil/profil.component';
import { ProfilUpdateComponent } from './profil/profil-update/profil-update/profil-update.component';
import { ProfilPasswordComponent } from './profil/profil-update/profil-password/profil-password.component';
import { ProfilDeleteComponent } from './profil/profil-update/profil-delete/profil-delete.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FullCalendarModule} from "@fullcalendar/angular";
import { CalendarComponent } from './calendar/calendar.component';
import { FormEventComponent } from './calendar/form-event/form-event.component';
import { MeteoComponent } from './meteo/meteo.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { EditEventComponent } from './calendar/edit-event/edit-event.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersCalendarAuthorizationComponent } from './users-list/users-calendar-authorization/users-calendar-authorization.component';
import { ManageAuthorizationComponent } from './manage-authorization/manage-authorization.component';
import {FilterPipe} from "../shared/pipes/filter.pipe";



@NgModule({
  declarations: [
    FeaturesContainerComponent,
    ProfilComponent,
    ProfilUpdateComponent,
    ProfilPasswordComponent,
    ProfilDeleteComponent,
    CalendarComponent,
    FormEventComponent,
    MeteoComponent,
    EditEventComponent,
    UsersListComponent,
    UsersCalendarAuthorizationComponent,
    ManageAuthorizationComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModules,
    SharedModule,
    CoreModule,
    ReactiveFormsModule,
    FullCalendarModule,
    MatDatepickerModule,
    FormsModule,
  ]
})
export class FeaturesModule { }
