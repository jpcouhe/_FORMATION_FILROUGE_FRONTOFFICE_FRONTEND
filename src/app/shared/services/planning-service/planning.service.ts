import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Planning} from "../../models/Planning.model";
import {Observable} from "rxjs";
import {SharePlanning} from "../../models/SharePlanning.model";


@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(private http: HttpClient) { }

  create(planningTitle: string, planningDescription: string, planningCreatedAt: Date, userId:string): Observable<Planning>{
    return this.http.post<Planning>('http://localhost:8080/api/planning', {
      planningTitle,
      planningDescription,
      planningCreatedAt,
      userId
    })
  }

  getPlanningById(planningId: string):Observable<Planning>{
    return this.http.get<Planning>("http://localhost:8080/api/planning/" + planningId)
  }

  getPlanning(userId: string):Observable<Planning>{
    return this.http.get<Planning>("http://localhost:8080/api/user/" + userId + "/planning")
  }

  interactWithPlanning(userId: number, planningId: number, permissionId: number): Observable<{ message: string }>{
    let interactData = {userId, planningId, permissionId}
    return this.http.post<{ message:string }>("http://localhost:8080/api/interact", interactData)
  }

  getShareUsersByPlanning(planningId:string):Observable<SharePlanning[]>{
    return this.http.get<SharePlanning[]>("http://localhost:8080/api/interact/planning/" + planningId)
  }


}
