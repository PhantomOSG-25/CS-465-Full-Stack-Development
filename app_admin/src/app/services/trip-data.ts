import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // GET: all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/trips`);
  }

  // GET: single trip by tripCode
  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBaseUrl}/trips/${tripCode}`);
  }

  // POST: add
  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiBaseUrl}/trips`, trip);
  }

  // PUT: update by tripCode
  updateTrip(tripCode: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBaseUrl}/trips/${tripCode}`, trip);
  }

  // DELETE: remove by tripCode (you’ll add backend later if needed)
  deleteTrip(tripCode: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/trips/${tripCode}`);
  }
}
