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
      left: 'title',
      center: '',
      right: 'addEventButton dayGridMonth,timeGridWeek,timeGridDay prev,next today'
    },
    customButtons:{
      addEventButton: {
        text: "add event",
        click: () => this.openModal()
      }
    },
    events:this.events1,
    weekends: true,
    editable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };
  currentEvents: EventApi[] = [];

  event$:BehaviorSubject<any> = new BehaviorSubject<any>(
    [{"title":"event 1","start": new Date()},
    {"title":"event 2","start": new Date()}


  ])


  constructor(private changeDetector: ChangeDetectorRef, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }


  handleEventClick(clickInfo: EventClickArg) {

    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
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
        const newEvent = {
          id: createEventId(),
          title: data.title,
          start: data.start,
          end: data.end
        }

        const eventList = this.event$.getValue();

        const newList = [...eventList, newEvent]

        this.event$.next(newList)


      }
    })


  }

}
