import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, EMPTY, map, Observable, of, ReplaySubject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //On garde quand même une valeur en mémoire, mais pas besoin d'une valeur initiale
  public isLogged$: ReplaySubject<boolean> = new ReplaySubject(1)
  public auth$: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  private userId= ''


  constructor(private http: HttpClient) {
  }

  public login(userEmail: string, userPassword: string): Observable<any> {
    let userCredential={userEmail,userPassword }
    return this.http.post<any>("http://localhost:8080/api/auth/signin", userCredential)
      .pipe(
        tap((user:any) => {
            console.log(user);
          this.userId = user.userId
          this.isLogged$.next(true);
          this.auth$.next(user)},
          ),
    )
  }

  public signup(firstname: string, lastname: string, email: string, password: string){
    return this.http.post<{message: string}>('http://localhost:8080/api/auth/signup', {
      firstname,
      lastname,
      email,
      password
    })
  }


  //todo logout

}
