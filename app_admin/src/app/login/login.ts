import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  formError = '';

  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  onLoginSubmit(): void {
    this.formError = '';

    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'Email and password are required.';
      return;
    }

    this.doLogin();
  }

  private doLogin(): void {
    const newUser = {
      email: this.credentials.email
    } as User;

    this.authenticationService.login(newUser, this.credentials.password).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => {
        this.formError = 'Login failed. Check email/password and try again.';
      }
    });
  }
}
