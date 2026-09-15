import { TestBed } from '@angular/core/testing';
import { OrbInput } from './animated-input';

describe('OrbInput', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('should type and rotate placeholders and clear its timer on destroy', () => {
    vi.useFakeTimers();
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    const fixture = TestBed.createComponent(OrbInput);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const input = element.querySelector('input')!;

    vi.advanceTimersByTime(75);
    fixture.detectChanges();
    expect(input.placeholder).toBe('h|');

    vi.advanceTimersByTime(75 * ('https://exemplo.com'.length - 1));
    fixture.detectChanges();
    expect(input.placeholder).toBe('https://exemplo.com');

    input.value = 'https://example.com/article';
    vi.advanceTimersByTime(2200 + 75);
    fixture.detectChanges();
    expect(input.placeholder).toBe('C|');
    expect(fixture.componentInstance.value).toBe('https://example.com/article');
    expect(element.querySelector('img')?.alt).toBe('');

    fixture.destroy();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('should use a static placeholder and orb when reduced motion is preferred', () => {
    vi.useFakeTimers();
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    const fixture = TestBed.createComponent(OrbInput);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;

    vi.advanceTimersByTime(5000);
    fixture.detectChanges();
    expect(element.querySelector('input')?.placeholder).toBe('https://exemplo.com');
    expect(element.querySelector('img')).toBeNull();
    fixture.destroy();
    expect(vi.getTimerCount()).toBe(0);
  });
});
