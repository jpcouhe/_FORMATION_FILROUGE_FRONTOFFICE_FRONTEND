import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, map, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth-service/auth.service";
import {User} from "../../models/User.model";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$ = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient, private authService: AuthService) { }

  updateUser(userId: string, userName: string, userFirstname: string, userCity: string, UserPicture: null) {
    const formData = new FormData();
    const user = {userFirstname, userName, UserPicture, userCity }
    formData.append("user", JSON.stringify(user))
    // todo : prise en charge des images
    // formData.append("image", image)
    return this.http.put<{message: string}>("http://localhost:8080/api/users/" + userId, user)
  }

  getUserById(userId:string){
    return this.http.get<User>("http://localhost:8080/api/users/" + userId).pipe(tap((user)=>{
        this.authService.auth$.next(user)
    }))
  }

  getAllUsers(filterId: any){
    return this.http.get<any>("http://localhost:8080/api/users").pipe(
        map((users => users.filter((user: any) => user.userId !== filterId)))
    )
  }

  updateUserPassword(userId: string, userOldPassword: String, userNewPassword: String){

    const credential = {
      userNewPassword:userNewPassword,
      userOldPassword:userOldPassword
    }
    return this.http.put<any>("http://localhost:8080/api/users/password/" + userId, credential)
  }

  deleteUser(userId: string){
    return this.http.delete<any>("http://localhost:8080/api/users/delete/" + userId)
  }



  getPlanningWithInteraction(userId: any){
    return this.http.get<any>("http://localhost:8080/api/interact/user/" + userId)
  }

  getIfUserHaveInteraction(userId: any, planningId: any){
    return this.http.get<any>("http://localhost:8080/api/interact/planning/" + userId + '/' + planningId)
  }



}
