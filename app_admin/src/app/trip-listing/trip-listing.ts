import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { TripCardComponent } from '../trip-card/trip-card';
import { TripDataService } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css']
})
export class TripListingComponent implements OnInit {
  trips$!: Observable<Trip[]>;

  constructor(private tripDataService: TripDataService, private router: Router) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  addTrip(): void {
    this.router.navigateByUrl('/add-trip');
  }

  // call this after returning home if needed
  loadTrips(): void {
    this.trips$ = this.tripDataService.getTrips().pipe(
      catchError(err => {
        console.error('Trips API error:', err);
        return of([] as Trip[]);
      }),
      shareReplay(1)
    );
  }
}
