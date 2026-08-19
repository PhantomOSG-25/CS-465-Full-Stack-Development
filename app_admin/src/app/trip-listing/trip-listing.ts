import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TripCardComponent } from '../trip-card/trip-card';
import { TripDataService } from '../services/trip-data';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css']
})
export class TripListingComponent implements OnInit {

  readonly trips = signal<Trip[]>([]);

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getTrips();
  }

  addTrip(): void {
    this.router.navigateByUrl('/add-trip');
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  editTrip(trip: Trip): void {
    this.router.navigate(['/edit-trip', trip.code]);
  }

  deleteTrip(trip: Trip): void {
    if (!trip?.code) return;

    const ok = window.confirm(
      `Delete "${trip.name}" (${trip.code})? This cannot be undone.`
    );
    if (!ok) return;

    this.tripDataService.deleteTrip(trip.code).subscribe({
      next: () => {
        this.trips.update((trips) => trips.filter((item) => item.code !== trip.code));
      },
      error: (err) => {
        console.error('Delete failed:', err);
        window.alert('Delete failed.');
      }
    });
  }

  private getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (data: Trip[]) => {
        this.trips.set(data ?? []);
      },
      error: (err) => {
        console.error('Error loading trips:', err);
        this.trips.set([]);
      }
    });
  }
}
