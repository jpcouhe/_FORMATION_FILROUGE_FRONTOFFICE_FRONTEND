import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject,Observable, tap} from "rxjs";

import {User} from "../../models/User.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private addressBackendServer = environment.addressBackendServer;

  public auth$: BehaviorSubject<User | {}> = new BehaviorSubject<User | {}>({})

  private userId:String = '';
  private isLoggedIn:boolean = false;
  private access_token: String = '';

  
  constructor(private http: HttpClient) {
  }



  public login(userEmail: string, userPassword: string): Observable<User> {
    let userCredential={userEmail,userPassword }
    return this.http.post<User>(this.addressBackendServer +"/api/auth/signin", userCredential)
      .pipe(
        tap((user:User) => {
          this.userId = user.userId!
          this.isLoggedIn = true;
          this.access_token = user.token!
          this.auth$.next(user)},
          ),
    )
  }

  public signup(userName: string, userFirstname: string, userPassword: string, userEmail: string, userPicture: null, userCity: null): Observable<{ message: string }>{
    return this.http.post<{message: string}>(this.addressBackendServer + '/api/auth/signup', {
      userName,
      userFirstname,
      userPassword,
      userEmail,
      userPicture,
      userCity
    })
  }

  public logout(){
      this.userId= '';
      this.isLoggedIn = false;
      this.access_token="";
  }



  getToken():String {
    return this.access_token
  }

  isLogged(): boolean{
    return this.isLoggedIn
  }
}
