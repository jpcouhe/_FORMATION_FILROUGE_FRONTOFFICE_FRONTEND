import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$ = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }

  updateUser(id: string, image: any, firstname: string, lastname: string, city: string) {
    const formData = new FormData();
    const user = {lastname: lastname, firstname:firstname}
    formData.append("user", JSON.stringify(user))
    formData.append("image", image)
    return this.http.put<{message: string}>("https://localhost:8080/api/user" + id, formData)
  }


}
