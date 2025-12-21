import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data';

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
    const token = this.getToken();
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > (Date.now() / 1000);
  }

  getCurrentUser(): User {
    const token = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  login(user: User, passwd: string): void {
    this.tripDataService.login(user, passwd).subscribe({
      next: (value) => {
        if (value?.token) {
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (err) => console.error('Login error:', err)
    });
  }

  register(user: User, passwd: string): void {
    this.tripDataService.register(user, passwd).subscribe({
      next: (value) => {
        if (value?.token) {
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (err) => console.error('Register error:', err)
    });
  }
}
