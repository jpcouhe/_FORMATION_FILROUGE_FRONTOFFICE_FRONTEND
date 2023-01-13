import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, map, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth-service/auth.service";
import {User} from "../../models/User.model";
import {Interaction} from "../../models/Interaction.model";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private addressBackendServer = environment.addressBackendServer;

  user$ = new BehaviorSubject<User | {}>({});

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserById(userId:string): Observable<User>{
    return this.http.get<User>(this.addressBackendServer + "/api/users/" + userId).pipe(tap((user)=>{
        this.authService.auth$.next(user)
    }))
  }

  getAllUsers(filterId: any): Observable<User[]>{
    return this.http.get<User[]>(this.addressBackendServer + "/api/users").pipe(
        map((users => users.filter((user: any) => user.userId !== filterId)))
    )
  }

  deleteUser(userId: string): Observable<{ message:string }>{
    return this.http.delete<{message:string}>(this.addressBackendServer + "/api/users/delete/" + userId)
  }


  updateUser(userId: string, userName: string, userFirstname: string, userCity: string, userPicture: string | File): Observable<{ message:string }> {

    const formData = new FormData();

    if (typeof userPicture == "string"){
      formData.append("userFirstname", userFirstname)
      formData.append("userName", userName)
      formData.append("city", userCity )
      formData.append("picture", userPicture)

    }else{

      formData.append("userFirstname", userFirstname)
      formData.append("userName", userName)
      formData.append("city", userCity )
      formData.append("file", userPicture)
    }


    return this.http.put<{message: string}>(this.addressBackendServer + "/api/users/" + userId, formData)
  }



  updateUserPassword(userId: string, userOldPassword: String, userNewPassword: String): Observable<{message:string}>{

    const credential = {
      userNewPassword:userNewPassword,
      userOldPassword:userOldPassword
    }
    return this.http.put<{ message: string }>(this.addressBackendServer + "/api/users/password/" + userId, credential)
  }

  getPlanningWithInteraction(userId: any): Observable<Interaction[]>{
    return this.http.get<Interaction[]>(this.addressBackendServer + "/api/interact/user/" + userId)
  }

  getIfUserHaveInteraction(userId: any, planningId: any): Observable<Permissions[]>{
    return this.http.get<Permissions[]>(this.addressBackendServer + "/api/interact/planning/" + userId + '/' + planningId)
  }



}
