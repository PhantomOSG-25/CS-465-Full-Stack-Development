import { describe, expect, it } from 'vitest';
import { NavbarComponent } from './navbar';

describe('NavbarComponent', () => {
  it('should create', () => {
    const component = new NavbarComponent({} as any, {} as any);
    expect(component).toBeTruthy();
  });
});
