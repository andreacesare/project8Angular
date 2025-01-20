import {ChangeDetectorRef, inject, Injectable, signal} from '@angular/core';

import { Place } from './place.model';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {}

  loadUserPlaces() {}

  addPlaceToUserPlaces(place: Place) {}

  removeUserPlace(place: Place) {
    const prevPlace = this.userPlaces();
    if(prevPlace.some(p=>p.id===place.id)){
      this.userPlaces.set(prevPlace.filter(p=>p.id!==place.id));

    }
    return this.httpClient.delete('http://localhost:3000/user-places/'+place.id);
  }
}
