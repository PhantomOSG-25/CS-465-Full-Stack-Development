import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // ✅ removed RouterLink

import { TripDataService } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ removed RouterLink
  templateUrl: './edit-trip.html',
  styleUrls: ['./edit-trip.css']
})
export class EditTripComponent implements OnInit {
  editForm!: FormGroup;
  submitted = false;
  message = '';
  tripCode = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    const code = localStorage.getItem('tripCode');
    if (!code) {
      alert("Couldn't find tripCode in localStorage.");
      this.router.navigateByUrl('/');
      return;
    }

    this.tripCode = code;

    this.editForm = this.fb.group({
      _id: [],
      code: [code, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.tripDataService.getTrip(code).subscribe({
      next: (trip: Trip) => {
        this.message = `Trip ${code} retrieved`;
        this.editForm.patchValue({
          ...trip,
          start: this.toDateInputValue(trip.start)
        });
      },
      error: (err) => {
        console.error(err);
        this.message = 'Trip not found / API error';
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.editForm.invalid) return;

    this.tripDataService.updateTrip(this.tripCode, this.editForm.value).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => console.error('Update error:', err)
    });
  }

  onCancel(): void {
    this.router.navigateByUrl('/');
  }

  get f() {
    return this.editForm.controls;
  }

  private toDateInputValue(dateStr: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toISOString().slice(0, 10);
  }
}
