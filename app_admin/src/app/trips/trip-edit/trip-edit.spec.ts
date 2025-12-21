import { describe, it, expect } from 'vitest';
import { TripEditComponent } from './trip-edit';

describe('TripEditComponent', () => {
  it('should create', () => {
    const component = new TripEditComponent({} as any);
    expect(component).toBeTruthy();
  });
});
