import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InteractService {

  constructor(private http: HttpClient) {
  }

  findByUserAndPlanning(userId:number, planningId:number){
      return this.http.get<any>(`http://localhost:8080/api/interact/planning/${planningId}/${userId}`)
  }

  deleteInteractWithPlanning(userId:number, planningId:number, permissionId:number){
   return this.http.delete(`http://localhost:8080/api/interact/planning/${userId}/${planningId}/${permissionId}`)
  }

  findInteractWithPlanning(userId:number, planningId:number, permissionId:number){
    return this.http.get<boolean>(`http://localhost:8080/api/interact/planning/${userId}/${planningId}/${permissionId}`)
  }

}
