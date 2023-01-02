import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  addEvent(eventName: string, eventStartDate: Date, eventEndDate: Date, planningId: string ){
    const event = {eventName, eventStartDate, eventEndDate, planningId}
    return this.http.post<any>('http://localhost:8080/api/planning/event', event )
  }

  deleteEvent(eventId: string){
    return this.http.delete('http://localhost:8080/api/planning/event/' + eventId)
  }

}
