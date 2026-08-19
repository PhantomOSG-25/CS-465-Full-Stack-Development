import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  getToken(): string {
    const token = this.storage.getItem('travlr-token');
    return token || '';
  }

  saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  logout(): void {
    this.storage.removeItem('travlr-token');
  }

  isLoggedIn(): boolean {
    const payload = this.decodeToken();
    return payload !== null && payload.exp > (Date.now() / 1000);
  }

  getCurrentUser(): User {
    const payload = this.decodeToken();
    if (!payload) return new User();
    const { email, name } = payload;
    return { email, name } as User;
  }

  private decodeToken(): { email: string; name: string; exp: number } | null {
    const token = this.getToken();
    const encodedPayload = token.split('.')[1];
    if (!encodedPayload) return null;

    try {
      const normalized = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
      return JSON.parse(atob(padded));
    } catch {
      this.logout();
      return null;
    }
  }

  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.tripDataService.login(user, passwd).pipe(
      tap((value) => {
        if (value?.token) {
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      })
    );
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.tripDataService.register(user, passwd).pipe(
      tap((value) => {
        if (value?.token) {
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      })
    );
  }
}
