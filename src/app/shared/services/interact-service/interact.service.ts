import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Interaction} from "../../models/Interaction.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InteractService {

  constructor(private http: HttpClient) {
  }

  findByUserAndPlanning(userId:number, planningId:number): Observable<Interaction[] | []>{
    return this.http.get<Interaction[] | []>(`http://localhost:8080/api/interact/planning/${planningId}/${userId}`)
  }

  deleteInteractWithPlanning(userId:number, planningId:number, permissionId:number):Observable<{ message:string }>{
   return this.http.delete<{message:string}>(`http://localhost:8080/api/interact/planning/${userId}/${planningId}/${permissionId}`)
  }

  findInteractWithPlanning(userId:number, planningId:number, permissionId:number):Observable<boolean>{
    return this.http.get<boolean>(`http://localhost:8080/api/interact/planning/${userId}/${planningId}/${permissionId}`)
  }

}
