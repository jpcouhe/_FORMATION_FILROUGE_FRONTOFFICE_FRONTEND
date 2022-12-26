import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { WeatherService } from 'src/app/shared/services/weather-service/weather.service';
import {min, Subscription} from "rxjs";
import {d, da} from "@fullcalendar/core/internal-common";
import {GoogleMapsService} from "../../shared/services/google-maps-service/google-maps.service";

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.scss']
})
export class MeteoComponent implements OnInit, OnDestroy {

  @ViewChild('addressText') addressText!: ElementRef;
  protected placeSubscription!: Subscription;

  city!: string;
  state!: string;
  temp!: number;
  hum!: number;
  wind!: number;
  today!: string;
  subscription!: Subscription;
  subscription2!: Subscription;
  errorMessage!: string;
  icon!: string;
  isDay!: boolean;
  currentHour:any
  displaymeteo: boolean = false
  forcast!: any;


  constructor(public activeRouter: ActivatedRoute, public weather: WeatherService, private googleMapService: GoogleMapsService) { }

  ngOnInit(): void {


    this.currentHour = new Date().getHours()
    if(this.currentHour >= 6 && this.currentHour < 21){
      this.isDay = true
    }else{
      this.isDay = false
    }
    //todo recup city profil user

    this.city = "Orléans"

    this.subscription = this.weather.getWeather(this.city).subscribe((payload:any) => {
      this.city = payload.name
      this.displaymeteo = true
      this.state = payload.weather[0].main;
      this.icon = payload.weather[0].icon;

      // Retour nombre arrondi au supérieur
      this.temp = Math.trunc(Number(payload.main.temp));
      this.hum = payload.main.humidity;
      this.wind = Math.round(Math.round(payload.wind.speed));
    })
    this.subscription2 = this.getForecast(this.city)

  }
  ngAfterViewInit(): void {
    this.googleMapService.getPlaceAutocomplete(this.addressText);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  getForecast(value: string){
    return this.weather.getForecast(value).subscribe((data) => {
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
    })
  }

  onAddressChange(value: string) {
    this.placeSubscription =
      this.googleMapService.placeObservable.subscribe(
        (place) => { console.log('nouvelle adresse : ' +
          place.formatted_address); }
      );

    this.subscription = this.weather.getWeather(value).subscribe((payload:any) => {
      this.displaymeteo = true
      this.city = payload.name
      this.state = payload.weather[0].main;
      this.icon = payload.weather[0].icon;
      // Retour nombre arrondi au supérieur
      this.temp = Math.trunc(Number(payload.main.temp));
      this.hum = payload.main.humidity;
      this.wind = Math.round(Math.round(payload.wind.speed));
    })

    this.subscription2 = this.getForecast(value)
  }


}
