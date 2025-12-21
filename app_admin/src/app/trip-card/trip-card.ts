import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css']
})
export class TripCardComponent {

  @Input() trip!: Trip;
  @Input() isAdmin = false;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onEdit(): void {
    this.edit.emit();
  }

  onDelete(): void {
    this.delete.emit();
  }
}
