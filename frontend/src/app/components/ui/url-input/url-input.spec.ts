import { TestBed } from '@angular/core/testing';
import { UrlInput } from './url-input';

describe('UrlInput', () => {
  it('should expose the entered URL', async () => {
    const fixture = TestBed.createComponent(UrlInput);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    const input = element.querySelector('input')!;

    expect(input.placeholder).toBe('https://exemplo.com');
    input.value = 'https://example.com/article';

    expect(fixture.componentInstance.value).toBe('https://example.com/article');
  });
});
