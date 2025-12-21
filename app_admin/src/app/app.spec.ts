import { describe, it, expect } from 'vitest';
import { App } from './app';

describe('App', () => {
  it('should create the app', () => {
    const app = new App();
    expect(app).toBeTruthy();
  });

  it('should have the correct title', () => {
    const app = new App();
    expect(app.title).toBe('Travlr Getaways Admin!');
  });
});
