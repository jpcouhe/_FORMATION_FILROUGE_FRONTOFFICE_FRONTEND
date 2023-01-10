import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventEntity} from "../../models/EventEntity.model";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  addEvent(eventName: string, eventStartDate: Date, eventEndDate: Date, eventDescription: String, planningId: string ): Observable<EventEntity>{
    const event = {eventName, eventStartDate, eventEndDate, eventDescription, planningId}
    return this.http.post<EventEntity>('http://localhost:8080/api/planning/event', event )
  }

  updateEvent(eventId:string, eventName: string, eventStartDate: Date, eventEndDate: Date, eventDescription: String): Observable<EventEntity>{
    const event = {eventName, eventStartDate, eventEndDate,eventDescription }
    return this.http.put<EventEntity>('http://localhost:8080/api/planning/event/' + eventId, event)
  }

  deleteEvent(eventId: string): Observable<{ message: string }>{
    return this.http.delete<{message:string}>('http://localhost:8080/api/planning/event/' + eventId)
  }

}
