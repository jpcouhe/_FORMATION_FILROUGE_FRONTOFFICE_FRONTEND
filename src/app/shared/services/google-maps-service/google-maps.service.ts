import { Injectable } from '@angular/core';
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  public placeSubject: Subject<google.maps.places.PlaceResult> = new Subject<google.maps.places.PlaceResult>();

  public placeObservable = this.placeSubject.asObservable();
  constructor() { }

  getPlaceAutocomplete(addressText: any): any {
    const autocomplete = new google.maps.places.Autocomplete(
      addressText.nativeElement,{ componentRestrictions: { country:
            ['FR', 'DE', 'GB'] }, types:     ['(cities)'] });
    google.maps.event.addListener(autocomplete,'place_changed',() => {
      const place = autocomplete.getPlace();
      this.placeSubject.next(place);
    });
  }

  getAddrComponent(place: any, componentTemplate: any): any {
    let result;
    for (const component of place.address_components) {
      const addressType = component.types[0];
      if (componentTemplate[addressType]) {
        result = component[componentTemplate[addressType]];
        return result;
      }
    }
  }

  getState(place: any): any {
    const COMPONENT_TEMPLATE = { administrative_area_level_1:  'short_name' };
    return this.getAddrComponent(place, COMPONENT_TEMPLATE);
  }
}
