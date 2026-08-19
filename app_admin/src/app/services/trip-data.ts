import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private readonly apiBaseUrl = '/api';

  constructor(private http: HttpClient) {}

  // ---------- AUTH ----------
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  private handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/${endpoint}`, formData);
  }

  // ---------- TRIPS ----------
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/trips`);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBaseUrl}/trips/${tripCode}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiBaseUrl}/trips`, trip);
  }

  updateTrip(tripCode: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBaseUrl}/trips/${tripCode}`, trip);
  }

  deleteTrip(tripCode: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/trips/${tripCode}`);
  }
}
