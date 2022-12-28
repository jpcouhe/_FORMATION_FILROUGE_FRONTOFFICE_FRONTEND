import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  addEvent(eventName: string, eventStartDate: Date, eventEndDate: Date, planningId: string ){
    const event = {eventName, eventStartDate, eventEndDate, planningId}
    return this.http.post<any>('http://localhost:8080/api/event', event )
  }


}
