import { FormBuilder } from '@angular/forms';
import { describe, expect, it } from 'vitest';
import { AddTripComponent } from './add-trip';

describe('AddTripComponent', () => {
  it('requires all trip fields', () => {
    const component = new AddTripComponent(
      new FormBuilder(),
      {} as any,
      {} as any
    );

    component.ngOnInit();
    expect(component.addForm.valid).toBe(false);

    component.addForm.setValue({
      code: 'TEST100',
      name: 'Test Journey',
      length: '2 nights',
      start: '2030-01-01',
      resort: 'Test Resort',
      perPerson: 499,
      image: 'test.jpg',
      description: 'A test trip'
    });

    expect(component.addForm.valid).toBe(true);
  });
});
