import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first, map, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private readonly forcastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  private readonly appID = "a8d6c44e712048000db043276e5b5b57";


 /* private readonly key = "9MXBZQNT9ZYR8XB8ZR2MVSVXD"
  private readonly baseUrlVisualcrossing = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"*/

  constructor(public http: HttpClient) {
  }

  getWeather(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.baseURL}${city}&units=${metric}&APPID=${this.appID}`).pipe((first()));
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.forcastURL}${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(
        first(),
        map((weather) => weather));
  }

/*  getWeather(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.baseUrlVisualcrossing}${city}?key=${this.key}`).pipe((first()));
  }*/

 /* getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get(
      `${this.forcastURL}${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(
        first(),
        map((weather) => weather));
  }*/

}
