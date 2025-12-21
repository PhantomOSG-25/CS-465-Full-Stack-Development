import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TripDataService } from '../../services/trip-data';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-edit.html',
  styleUrls: ['./trip-edit.css']
})
export class TripEditComponent {
  @Input() trip!: Trip;

  @Output() tripUpdated = new EventEmitter<void>();
  @Output() tripDeleted = new EventEmitter<void>();

  saving = false;
  deleting = false;
  errorMessage = '';

  constructor(private tripService: TripDataService) {}

  saveTrip(): void {
    if (!this.trip?._id) return;

    this.saving = true;
    this.errorMessage = '';

    this.tripService.updateTrip(this.trip._id, this.trip).subscribe({
      next: () => {
        this.saving = false;
        this.tripUpdated.emit();
      },
      error: (err) => {
        this.saving = false;
        this.errorMessage = 'Failed to update trip.';
        console.error(err);
      }
    });
  }

  deleteTrip(): void {
    if (!this.trip?._id) return;

    this.deleting = true;
    this.errorMessage = '';

    this.tripService.deleteTrip(this.trip._id).subscribe({
      next: () => {
        this.deleting = false;
        this.tripDeleted.emit();
      },
      error: (err) => {
        this.deleting = false;
        this.errorMessage = 'Failed to delete trip.';
        console.error(err);
      }
    });
  }
}
