import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  addEvent(eventName: string, eventStartDate: Date, eventEndDate: Date, eventDescription: String, planningId: string ){
    const event = {eventName, eventStartDate, eventEndDate, eventDescription, planningId}
    return this.http.post<any>('http://localhost:8080/api/planning/event', event )
  }

  updateEvent(eventId:string, eventName: string, eventStartDate: Date, eventEndDate: Date, eventDescription: String){
    const event = {eventName, eventStartDate, eventEndDate,eventDescription }
    console.log(event)
    return this.http.put<any>('http://localhost:8080/api/planning/event/' + eventId, event)
  }

  deleteEvent(eventId: string){
    return this.http.delete('http://localhost:8080/api/planning/event/' + eventId)
  }

}
