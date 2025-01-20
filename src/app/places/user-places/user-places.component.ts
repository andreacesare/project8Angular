import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import {Place} from "../place.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {PlacesService} from "../places.service";

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  private httpclient = inject(HttpClient);
  private destroyref = inject(DestroyRef);
  private placeService=inject(PlacesService);

  ngOnInit() {
    const sub = this.httpclient.get<{ places: Place[] }>('http://localhost:3000/user-places')
      .pipe(map(r => r.places))
      .subscribe({
        next: p => this.places.set(p)
      });
    this.destroyref.onDestroy(() => sub.unsubscribe());
  }

  onRemovePlace(place:Place){
  const sub=this.placeService.removeUserPlace(place).subscribe();

    this.destroyref.onDestroy(() => sub.unsubscribe());
  }
}
