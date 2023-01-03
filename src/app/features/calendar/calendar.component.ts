import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventAddArg, EventApi, EventClickArg} from "@fullcalendar/core";

import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from '@fullcalendar/list';

import {createEventId, INITIAL_EVENTS} from "../../shared/Utils/event-utils";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FormEventComponent} from "./form-event/form-event.component";
import {BehaviorSubject, map, Observable, of, switchAll, switchMap, tap} from "rxjs";
import {EditEventComponent} from "./edit-event/edit-event.component";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../shared/services/event-service/event.service";
import {UserService} from "../../shared/services/user-service/user.service";
import {AuthService} from "../../shared/services/auth-service/auth.service";
import {PlanningService} from "../../shared/services/planning-service/planning.service";
import {MatSnackBar} from "@angular/material/snack-bar";


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
      left: 'addEventButton',
      right: 'title'
    },
    footerToolbar:{
      center : "dayGridMonth,timeGridWeek,timeGridDay prev,next today"
    },
    customButtons:{
      addEventButton: {
        text: "Ajouter un événement",
        click: () => this.openModal(),
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
  isShareCalendar:boolean = false
  shareCalendar: any;

  constructor( private route: ActivatedRoute, private changeDetector: ChangeDetectorRef, private dialog: MatDialog, private router: Router, private eventService: EventService, private userService: UserService, private authService: AuthService, private planningService: PlanningService, private snackBar:MatSnackBar) {
  }

  ngOnInit(): void {


    this.user = this.authService.auth$.getValue()
    if(this.route.snapshot.params['id'] !== undefined){
      this.planningService.getPlanningById(this.route.snapshot.params['id']).subscribe((data)=>{
        this.isShareCalendar = true
        this.shareCalendar = data
        this.events1 = data.eventsByPlanningId
        this.event$.next(data.eventsByPlanningId)
      })
    }else{
      this.planningService.getPlanning(this.user.userId).subscribe((data)=>{
        this.isShareCalendar = false
        this.events1 = data.eventsByPlanningId
        this.event$.next(data.eventsByPlanningId)
      })
    }
  }


  handleEventClick(clickInfo: EventClickArg) {

    if(this.route.snapshot.params['id']){
          this.userService.getIfUserHaveInteraction(this.route.snapshot.params['id'],this.user.userId).pipe(
            map((data => data.filter((p: any) => p.permissionsByPermissionId.permissionId == 2)))
          )
            .subscribe((data) => {
              if(data.length > 0){
                this.displayModalToRemove(clickInfo)
              }else{
             this.displayErrorMessage()
              }
            })
    }else{
      this.displayModalToRemove(clickInfo)
    }

  }

  handleEvents(events: EventApi[]) {
    //todo appel réseau pour edite l'event
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  openModal() {

    if(this.route.snapshot.params['id'] !== undefined){
        this.userService.getIfUserHaveInteraction(this.route.snapshot.params['id'],this.user.userId).pipe(
          map((data => data.filter((p: any) => p.permissionsByPermissionId.permissionId == 2)))
        )
          .subscribe((data) => {
          if(data.length > 0){
            this.displayModalToCreate();
          }else{
            this.displayErrorMessage();
          }
        })

    }else{
      this.displayModalToCreate()
    }

  }

  private redirect() {
      this.router.navigateByUrl("accueil/calendar/authorization")
  }


  displayErrorMessage(){
    this.snackBar.open("Vous n'avez les droits d'accès", 'Try again!', {
      duration:5000,
      verticalPosition:'top',
      panelClass: ['red-snackbar','login-snackbar'],
    })
  }

  displayModalToCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "600px";
    dialogConfig.maxWidth = "80%";

    const ref = this.dialog.open(FormEventComponent, dialogConfig)

    if(this.route.snapshot.params['id'] !== undefined){
      ref.afterClosed().subscribe((data:any) => {
        if(data) {
          this.eventService.addEvent(data.title, data.start, data.end,this.route.snapshot.params['id'] ).subscribe((newEvent) => {
            const eventList = this.event$.getValue();
            const newList = [...eventList, newEvent]
            this.events1 = [...this.events1, newEvent]
            this.changeDetector.detectChanges()
            this.event$.next(newList)
            this.calendarOptions.events = [...this.events1, newEvent]
          })
        }
      })
    }else{
      ref.afterClosed().subscribe((data:any) => {
        if(data) {
          this.eventService.addEvent(data.title, data.start, data.end, this.user.planningsByUserId[0].planningId).subscribe((newEvent) => {
            const eventList = this.event$.getValue();
            const newList = [...eventList, newEvent]
            this.events1 = [...this.events1, newEvent]
            this.changeDetector.detectChanges()
            this.event$.next(newList)
            this.calendarOptions.events = [...this.events1, newEvent]
          })
        }
      })
    }
  }


  displayModalToRemove(clickInfo: EventClickArg){
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
        clickInfo.event.remove();
      }
    )
  }

}
