import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  onLogout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('/');
  }
}
