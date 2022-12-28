import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$ = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }

  updateUser(userId: string, userName: string, userFirstname: string, userCity: string, UserPicture: null) {
    const formData = new FormData();
    const user = {userFirstname, userName, UserPicture, userCity }
    console.log(user)
    formData.append("user", JSON.stringify(user))
    // todo : prise en charge des images
    // formData.append("image", image)
    return this.http.put<{message: string}>("http://localhost:8080/api/users/" + userId, user)
  }


}
