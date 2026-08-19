import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
  { path: '', component: TripListingComponent },
  { path: 'login', loadComponent: () => import('./login/login').then(m => m.LoginComponent) },
  {
    path: 'add-trip',
    canActivate: [authGuard],
    loadComponent: () => import('./add-trip/add-trip').then(m => m.AddTripComponent)
  },
  {
    path: 'edit-trip/:tripCode',
    canActivate: [authGuard],
    loadComponent: () => import('./edit-trip/edit-trip').then(m => m.EditTripComponent)
  },
  { path: '**', redirectTo: '' }
];
