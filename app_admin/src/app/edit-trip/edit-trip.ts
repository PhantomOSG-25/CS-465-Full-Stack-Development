import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TripDataService } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrls: ['./edit-trip.css']
})
export class EditTripComponent implements OnInit {
  editForm!: FormGroup;
  submitted = false;
  message = '';
  private tripCode = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('tripCode');

    if (!code) {
      this.message = 'A trip code is required.';
      this.router.navigateByUrl('/');
      return;
    }

    this.tripCode = code;

    // Build the form first
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

    // Load trip and patch into form
    this.tripDataService.getTrip(code).subscribe({
      next: (trip: Trip) => {
        this.message = `Trip ${code} retrieved`;

        this.editForm.patchValue({
          ...trip,
          start: this.toDateInputValue(trip.start)
        });
      },
      error: (err) => {
        console.error('Get trip error:', err);
        this.message = 'Trip not found / API error';
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.editForm.invalid) return;

    this.tripDataService.updateTrip(this.tripCode, this.editForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
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
