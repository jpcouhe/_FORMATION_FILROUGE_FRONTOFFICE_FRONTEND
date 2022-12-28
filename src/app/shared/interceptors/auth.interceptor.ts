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

  constructor(private AuthService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    // todo vérifier ?
    if(request.url.includes('openweather')){
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
