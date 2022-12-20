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

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>("https://localhost:8080/api/auth/login", email)
      .pipe(
        tap((user:any) => {
          this.userId = user.userId
          this.isLogged$.next(true);
          this.auth$.next(user)},
          ),
    )
  }

  public signup(firstname: string, lastname: string, email: string, password: string){
    return this.http.post<{message: string}>('https://localhost:8080/api/auth/signup', {
      firstname,
      lastname,
      email,
      password
    })
  }


}
