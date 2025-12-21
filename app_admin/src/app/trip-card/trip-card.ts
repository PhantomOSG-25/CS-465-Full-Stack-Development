import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css']
})
export class TripCardComponent {
  @Input() trip?: Trip;

  constructor(private router: Router) {}

  editTrip(): void {
    if (!this.trip?.code) return;
    localStorage.setItem('tripCode', this.trip.code);
    this.router.navigateByUrl('/edit-trip');
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/reef1.jpg';
  }
}
