import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrls: ['./add-trip.css']
})
export class AddTripComponent implements OnInit {
  addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.addForm.valid) return;

    this.tripService.addTrip(this.addForm.value).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (error) => console.error('Add trip error:', error)
    });
  }

  cancel(): void {
    this.router.navigateByUrl('/');
  }

  get f() {
    return this.addForm.controls;
  }
}
