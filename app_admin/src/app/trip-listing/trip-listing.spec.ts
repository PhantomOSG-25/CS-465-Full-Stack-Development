import { describe, it, expect } from 'vitest';
import { TripListingComponent } from './trip-listing';

describe('TripListingComponent', () => {
  it('should create', () => {
    const component = new TripListingComponent({} as any, {} as any, {} as any);
    expect(component).toBeTruthy();
  });
});
