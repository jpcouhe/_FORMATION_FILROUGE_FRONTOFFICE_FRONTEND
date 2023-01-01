import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventAddArg, EventApi, EventClickArg} from "@fullcalendar/core";

import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from '@fullcalendar/list';

import {createEventId, INITIAL_EVENTS} from "../../shared/Utils/event-utils";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FormEventComponent} from "./form-event/form-event.component";
import {BehaviorSubject, Observable, of, switchAll, switchMap} from "rxjs";
import {EditEventComponent} from "./edit-event/edit-event.component";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {Router} from "@angular/router";
import {EventService} from "../../shared/services/event-service/event.service";
import {UserService} from "../../shared/services/user-service/user.service";
import {AuthService} from "../../shared/services/auth-service/auth.service";
import {PlanningService} from "../../shared/services/planning-service/planning.service";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{

  events1: {}[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'addEventButton2',
      center: 'addEventButton dayGridMonth,timeGridWeek,timeGridDay prev,next today',
      right: 'title'
    },
    customButtons:{
      addEventButton: {
        text: "Ajouter un événement",
        click: () => this.openModal(),
      },
      addEventButton2: {
        text: "Liste des partages",
        click: () => this.redirect(),
      }
    },
    events:this.events1,
    weekends: true,
    editable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventColor: '#2C3E50'
  };
  currentEvents: EventApi[] = [];

  event$:BehaviorSubject<any> = new BehaviorSubject<any>([])

  user!: any

  constructor(private changeDetector: ChangeDetectorRef, private dialog: MatDialog, private route: Router, private eventService: EventService, private userService: UserService, private authService: AuthService, private planningService: PlanningService,private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.user = this.authService.auth$.getValue()
    this.planningService.getPlanning(this.user.planningsByUserId[0].planningId).subscribe((data)=>{
      this.events1 = data.eventsByPlanningId
      this.event$.next(data.eventsByPlanningId)
    })
  }


  handleEventClick(clickInfo: EventClickArg) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "600px";
    dialogConfig.maxWidth = "80%";
    dialogConfig.data = clickInfo;
    const ref = this.dialog.open(EditEventComponent, dialogConfig)

    ref.afterClosed().pipe(
      switchMap((dataId) => {
        return this.eventService.deleteEvent(dataId)
      })
    ).subscribe(
      () => {
        /*this.events1 = this.events1.filter((eventId:any) => {
            return eventId.id != clickInfo.event.id
        })*/
        clickInfo.event.remove();
      }
    )


  }

  handleEvents(events: EventApi[]) {
    //todo appel réseau pour edite l'event
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "600px";
    dialogConfig.maxWidth = "80%";

    const ref = this.dialog.open(FormEventComponent, dialogConfig)
    ref.afterClosed().subscribe((data:any) => {
      if(data) {

        this.eventService.addEvent(data.title, data.start, data.end, this.user.planningsByUserId[0].planningId).subscribe((newEvent) => {
          const eventList = this.event$.getValue();
          const newList = [...eventList, newEvent]
          this.events1 = [...this.events1, newEvent]
          this.changeDetector.detectChanges()
          console.log(this.events1)
          this.event$.next(newList)
          this.calendarOptions.events = [...this.events1, newEvent]
        })
      }
    })
  }

  private redirect() {
      this.route.navigateByUrl("accueil/calendar/authorization")
  }
}
