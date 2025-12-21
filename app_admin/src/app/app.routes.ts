import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing';

export const routes: Routes = [
  { path: '', component: TripListingComponent },
  {
    path: 'add-trip',
    loadComponent: () => import('./add-trip/add-trip').then(m => m.AddTripComponent)
  },
  {
    path: 'edit-trip',
    loadComponent: () => import('./edit-trip/edit-trip').then(m => m.EditTripComponent)
  },
  { path: '**', redirectTo: '' }
];
