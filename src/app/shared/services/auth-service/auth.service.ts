import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, EMPTY, map, Observable, of, ReplaySubject, tap} from "rxjs";
import {UserService} from "../user-service/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //On garde quand même une valeur en mémoire, mais pas besoin d'une valeur initiale

  public auth$: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  private userId= ''
  private isLoggedIn = false;
  private access_token="";
  constructor(private http: HttpClient) {
  }

  public login(userEmail: string, userPassword: string): Observable<any> {
    let userCredential={userEmail,userPassword }
    return this.http.post<any>("http://localhost:8080/api/auth/signin", userCredential)
      .pipe(
        tap((user:any) => {
          this.userId = user.userId
          this.isLoggedIn = true;
          this.access_token = user.token
          this.auth$.next(user)},
          ),
    )
  }

  public signup(userName: string, userFirstname: string, userPassword: string, userEmail: string, userPicture: null, userCity: null){
    return this.http.post<{message: string}>('http://localhost:8080/api/auth/signup', {
      userName,
      userFirstname,
      userPassword,
      userEmail,
      userPicture,
      userCity
    })
  }

  public logout(){
      this.userId= ''
      this.isLoggedIn = false;
      this.access_token="";
      this.auth$.next(null)
  }



  getToken(){
    return this.access_token
  }

  isLogged(){
    return this.isLoggedIn
  }
}
