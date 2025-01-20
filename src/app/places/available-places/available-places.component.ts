import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  private httpclient = inject(HttpClient);
  private destroyref = inject(DestroyRef);

  ngOnInit() {
    const sub = this.httpclient.get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(map(r => r.places))
      .subscribe({
        next: p => this.places.set(p)
      });
    this.destroyref.onDestroy(() => sub.unsubscribe());
  }

  onSelectPlace(selectedPlace: Place) {
    this.httpclient.put('http://localhost:3000/user-places', {
      placeId: selectedPlace.id
    }).subscribe({});
  }
}
