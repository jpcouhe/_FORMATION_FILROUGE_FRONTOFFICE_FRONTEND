import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Planning} from "../../models/Planning.model";

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(private http: HttpClient) { }

  create(planningTitle: string, planningDescription: string, planningCreatedAt: Date, userId:string){
    return this.http.post<Planning>('http://localhost:8080/api/planning', {
      planningTitle,
      planningDescription,
      planningCreatedAt,
      userId
    })
  }

  getPlanning(planningId: string){
    return this.http.get<any>("http://localhost:8080/api/planning/" + planningId)
  }

}
