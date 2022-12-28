import { Injectable } from '@angular/core';
import {BehaviorSubject, tap} from "rxjs";
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
    this.http.get<User>("http://localhost:8080/api/users/" + userId).pipe(tap((user)=>{
      console.log(user)
        this.authService.auth$.next(user)
    })).subscribe();
  }
}
