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
import {ReactiveFormsModule} from "@angular/forms";
import {FullCalendarModule} from "@fullcalendar/angular";
import { CalendarComponent } from './calendar/calendar.component';
import { FormEventComponent } from './calendar/form-event/form-event.component';
import { MeteoComponent } from './meteo/meteo.component';
import {MatDatepickerModule} from "@angular/material/datepicker";



@NgModule({
  declarations: [
    FeaturesContainerComponent,
    ProfilComponent,
    ProfilUpdateComponent,
    ProfilPasswordComponent,
    ProfilDeleteComponent,
    CalendarComponent,
    FormEventComponent,
    MeteoComponent
  ],
    imports: [
        CommonModule,
        FeaturesRoutingModules,
        SharedModule,
        CoreModule,
        ReactiveFormsModule,
        FullCalendarModule,
        MatDatepickerModule
    ]
})
export class FeaturesModule { }
