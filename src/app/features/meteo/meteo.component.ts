import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { WeatherService } from 'src/app/shared/services/weather-service/weather.service';
import {
  forkJoin,
  Subscription,
  switchMap,
  tap,
} from "rxjs";
import {GoogleMapsService} from "../../shared/services/google-maps-service/google-maps.service";
import {AuthService} from "../../shared/services/auth-service/auth.service";
import {User} from "../../shared/models/User.model";

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.scss']
})
export class MeteoComponent implements OnInit, OnDestroy {

  @ViewChild('addressText') addressText!: ElementRef;


  city!: string;
  state!: string;
  temp!: number;
  hum!: number;
  wind!: number;
  today!: string;
  subscription!: Subscription;
  errorMessage!: string;
  icon!: string;
  isDay!: boolean;
  currentHour:any
  displaymeteo: boolean = false
  forcast!: any;
  user!: User


  constructor(public weather: WeatherService, private googleMapService: GoogleMapsService, private authService: AuthService) { }

  ngOnInit(): void {

    this.currentHour = new Date().getHours()
    if(this.currentHour >= 6 && this.currentHour < 21){
      this.isDay = true
    }else{
      this.isDay = false
    }

    this.subscription = this.authService.auth$.pipe(
      tap((user) => {
        if(Object.entries(user).length !=0){
          this.user = user as User;
        }
      }),
      switchMap(() => {
          return forkJoin([
             this.weather.getWeather(this.user.userCity!),
             this.weather.getForecast(this.user.userCity!)
          ])
      })
    ).subscribe(([payload, data])=>{
          this.displayMeteo(payload)
          this.displayForecast(data)
    });

  }
  ngAfterViewInit(): void {
    this.googleMapService.getPlaceAutocomplete(this.addressText);
  }

  onAddressChange(value: string) {

    this.subscription = this.authService.auth$.pipe(
      switchMap(() => {
        return forkJoin([
          this.weather.getWeather(value),
          this.weather.getForecast(value)
        ])
      })
    ).subscribe(([payload, data])=>{
      this.displayMeteo(payload)
      this.displayForecast(data)
    });

  }


  displayForecast(data:any) {
    this.forcast = []
    for (let i = 0; i < 7; i++) {
      let unix_timestamp = data.list[i].dt
      let date = new Date(unix_timestamp * 1000)
      let hours = date.getHours();
      let newForcast = {
        dt: hours,
        temp: Math.trunc(data.list[i].main.temp)
      }
      this.forcast.push(newForcast)
    }
  }

  displayMeteo(payload:any){
    this.city = payload.name
    this.displaymeteo = true
    this.state = payload.weather[0].main;
    this.icon = payload.weather[0].icon;
    this.temp = Math.trunc(Number(payload.main.temp));
    this.hum = payload.main.humidity;
    this.wind = Math.round(Math.round(payload.wind.speed));
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
