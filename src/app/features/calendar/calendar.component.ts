import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventAddArg, EventApi, EventClickArg} from "@fullcalendar/core";

import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from '@fullcalendar/list';

import {createEventId, INITIAL_EVENTS} from "../../shared/Utils/event-utils";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FormEventComponent} from "./form-event/form-event.component";
import {BehaviorSubject, Observable, of} from "rxjs";
import {EditEventComponent} from "./edit-event/edit-event.component";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {Router} from "@angular/router";
import {EventService} from "../../shared/services/event-service/event.service";
import {UserService} from "../../shared/services/user-service/user.service";
import {AuthService} from "../../shared/services/auth-service/auth.service";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{

  events1 = [];

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

  event$:BehaviorSubject<any> = new BehaviorSubject<any>(
    [
  ])

  user!: any

  constructor(private changeDetector: ChangeDetectorRef, private dialog: MatDialog, private route: Router, private eventService: EventService, private userService: UserService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.auth$.getValue()
    this.events1 = this.event$.getValue();
    console.log(this.user)
    //todo appel réseau pour récupérer les events
    //todo faire appel réseau avec id d'un calendrier
  }


  handleEventClick(clickInfo: EventClickArg) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "600px";
    dialogConfig.maxWidth = "80%";
    dialogConfig.data = clickInfo;
    const ref = this.dialog.open(EditEventComponent, dialogConfig)

    ref.afterClosed().subscribe(
      data => {
        console.log(data)
        const eventList = this.event$.getValue();
        const newEventList = []

        for(let i = 0; i<eventList.length; i++){

          if(eventList[i].id != data){
            //todo appel réseau pour delete
            newEventList.push(eventList[i])
          }
        }
        this.event$.next(newEventList)
      }
    )

  }

  handleEvents(events: EventApi[]) {
    console.log("salut")
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
        console.log(data)
        this.eventService.addEvent(data.title, data.start, data.end, this.user.planningsByUserId[0].planningId).subscribe((newEvent) => {
          const eventList = this.event$.getValue();
          const newList = [...eventList, newEvent]
          this.event$.next(newList)
        })
      }
    })
  }

  private redirect() {
      this.route.navigateByUrl("accueil/calendar/authorization")
  }
}
