import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth-service/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private urlOpenWeather:string = "openweather"

  constructor(private AuthService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(request.url.includes(this.urlOpenWeather)){
        return next.handle(request)
    }else{
         const authToken = this.AuthService.getToken();
          const newRequest = request.clone({
            headers: request.headers.set("authorization", "Bearer " + authToken),
          });
          return next.handle(newRequest);
    }
  }
}

export const AuthInterceptorProviders = [  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}];


// todo vérifier ?
/*
    if(request.headers.has("skip")){
      console.log("salut")
      console.log(request)
      const newRequest = request.clone({
        headers: request.headers.delete("skip")
      })
      console.log(newRequest)
      return next.handle(newRequest);
    }
*/
