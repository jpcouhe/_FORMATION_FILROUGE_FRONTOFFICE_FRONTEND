import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventAddArg, EventApi, EventClickArg} from "@fullcalendar/core";

import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from '@fullcalendar/list';

import {createEventId, INITIAL_EVENTS} from "../../shared/Utils/event-utils";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FormEventComponent} from "./form-event/form-event.component";
import {BehaviorSubject, EMPTY, map, Observable, of, switchAll, switchMap, tap} from "rxjs";
import {EditEventComponent} from "./edit-event/edit-event.component";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../shared/services/event-service/event.service";
import {UserService} from "../../shared/services/user-service/user.service";
import {AuthService} from "../../shared/services/auth-service/auth.service";
import {PlanningService} from "../../shared/services/planning-service/planning.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import frLocale from '@Fullcalendar/core/locales/fr'
import {d} from "@fullcalendar/core/internal-common";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{

  /*events1: {}[] = [];
*/
  calendarOptions: CalendarOptions = {
    locale: frLocale,
    timeZone: 'UTC',
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
/*    events:this.events1,*/
    weekends: true,
    editable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEvents.bind(this),
    eventResize:this.handleEvents.bind(this),
    eventColor: '#2C3E50',
    eventTimeFormat: { // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false
    },

  };

  currentEvents: EventApi[] = [];

  event$:BehaviorSubject<any> = new BehaviorSubject<any>([])

  user!: any
  isShareCalendar:boolean = false
  shareCalendar: any;
  isParam!:any
  errorMessage!: boolean;
  constructor( private route: ActivatedRoute, private changeDetector: ChangeDetectorRef, private dialog: MatDialog, private router: Router, private eventService: EventService, private userService: UserService, private authService: AuthService, private planningService: PlanningService, private snackBar:MatSnackBar) {
  }

  ngOnInit(): void {
    this.user = this.authService.auth$.getValue()
    this.route.params.pipe(
      tap((params) => {
        this.isParam = params
      }),
      switchMap(async (isParam) => {
        if(Object.keys(this.isParam).length === 0 && this.isParam.constructor === Object){
          this.planningService.getPlanning(this.user.userId).subscribe((data) => {
            this.isShareCalendar = false;
            this.event$.next(data.eventsByPlanningId);
          })

      }else {
          this.planningService.getPlanningById(this.isParam.id).subscribe((data) => {
            this.isShareCalendar = true;
            this.shareCalendar = data;
            this.event$.next(data.eventsByPlanningId);
            this.planningService.planningView$.next(data);
          })
        }}),
      switchMap(()=>{

        if(Object.keys(this.isParam).length === 0 && this.isParam.constructor === Object){
          return EMPTY

        }else{

         return this.userService.getIfUserHaveInteraction(this.isParam.id, this.user.userId)
        }
      })
      ).subscribe((data) => {
      if(data.length >= 2){
        this.errorMessage = false
      }else{
        this.errorMessage = true
      }
    })

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

  handleEvents(events: any) {
    debugger
    const eventStart = events.event.end
    console.log(events.event.id)
    console.log(events.event.start)
    console.log(events.event.end)
    console.log(events.event.title)

    this.eventService.updateEvent(events.event.id,events.event.title,events.event.start,events.event.end).subscribe((data) =>{
      const eventList = this.event$.getValue();
      const newList = eventList.filter((e:any) => e.id != events.event.id)
      newList.push(data)
      this.event$.next(newList)
    })

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

  displayErrorMessage(){
    this.snackBar.open("Vous n'avez les droits d'accès", 'Fermer', {
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
            this.changeDetector.detectChanges()
            this.event$.next(newList)
          })
        }
      })
    }else{
      ref.afterClosed().subscribe((data:any) => {
        if(data) {
          this.eventService.addEvent(data.title, data.start, data.end, this.user.planningsByUserId[0].planningId).subscribe((newEvent) => {
            const eventList = this.event$.getValue();
            const newList = [...eventList, newEvent]
            this.changeDetector.detectChanges()
            this.event$.next(newList)
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

    let id: any;
    ref.afterClosed().pipe(
      switchMap((dataId) => {
        id = dataId
        return this.eventService.deleteEvent(dataId)
      })
    ).subscribe(
      () => {
        this.event$.getValue()
        const eventList = this.event$.getValue();
        const newList = eventList.filter((e:any) => e.id != id)

        this.event$.next(newList)
        clickInfo.event.remove();
      }
    )
  }


}
