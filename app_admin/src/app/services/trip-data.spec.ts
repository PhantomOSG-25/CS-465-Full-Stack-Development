import { describe, it, expect } from 'vitest';
import { TripDataService } from './trip-data';

describe('TripDataService', () => {
  it('should be created', () => {
    const service = new TripDataService({} as any);
    expect(service).toBeTruthy();
  });
});
