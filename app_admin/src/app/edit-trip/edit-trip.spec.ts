import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { describe, expect, it } from 'vitest';
import { EditTripComponent } from './edit-trip';

describe('EditTripComponent', () => {
  it('loads the trip code from the route', () => {
    const tripService = {
      getTrip: () => of({
        code: 'TEST100',
        name: 'Test Journey',
        length: '2 nights',
        start: '2030-01-01T00:00:00.000Z',
        resort: 'Test Resort',
        perPerson: '499',
        image: 'test.jpg',
        description: 'A test trip'
      })
    };

    const component = new EditTripComponent(
      new FormBuilder(),
      { snapshot: { paramMap: { get: () => 'TEST100' } } } as any,
      {} as any,
      tripService as any
    );

    component.ngOnInit();
    expect(component.editForm.get('code')?.value).toBe('TEST100');
  });
});
