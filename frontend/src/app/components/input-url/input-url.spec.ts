import { TestBed } from '@angular/core/testing';
import { EMPTY, Observable, of } from 'rxjs';
import { ShortnerUrl } from '../../services/shortner-url';
import { InputUrl } from './input-url';

describe('InputUrl', () => {
  let response$: Observable<string>;
  const shortenUrl = vi.fn((_: string): Observable<string> => response$);

  beforeEach(async () => {
    response$ = EMPTY;
    shortenUrl.mockClear();

    await TestBed.configureTestingModule({
      imports: [InputUrl],
      providers: [{ provide: ShortnerUrl, useValue: { shortenUrl } }],
    }).compileComponents();
  });

  it('should render a required URL field and shorten button', async () => {
    const fixture = TestBed.createComponent(InputUrl);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    const input = element.querySelector('input')!;

    expect(input.type).toBe('url');
    expect(input.required).toBe(true);
    expect(input.getAttribute('aria-label')).toBe('URL para encurtar');
    expect(element.querySelector('button')?.textContent?.trim()).toBe('Shorten');
    expect(element.querySelector('button')?.type).toBe('submit');
  });

  it('should emit the URL without navigating on submission', async () => {
    const fixture = TestBed.createComponent(InputUrl);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    const submitted = vi.fn();
    fixture.componentInstance.urlSubmitted.subscribe(submitted);
    element.querySelector('input')!.value = 'https://example.com/article';
    const event = new Event('submit', { cancelable: true });

    element.querySelector('form')!.dispatchEvent(event);

    expect(submitted).toHaveBeenCalledWith('https://example.com/article');
    expect(event.defaultPrevented).toBe(true);
  });

  it('should reject empty and malformed URLs through native validation', async () => {
    const fixture = TestBed.createComponent(InputUrl);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    const input = element.querySelector('input')!;

    expect(input.checkValidity()).toBe(false);
    input.value = 'not-a-url';
    expect(input.checkValidity()).toBe(false);
    input.value = 'https://example.com';
    expect(input.checkValidity()).toBe(true);
  });

  it('should submit a valid URL when the animated button is clicked', async () => {
    const fixture = TestBed.createComponent(InputUrl);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    const submitted = vi.fn();
    fixture.componentInstance.urlSubmitted.subscribe(submitted);

    element.querySelector('button')!.click();
    expect(submitted).not.toHaveBeenCalled();

    element.querySelector('input')!.value = 'https://example.com';
    element.querySelector('button')!.click();
    expect(submitted).toHaveBeenCalledExactlyOnceWith('https://example.com');
  });

  it('should render the shortened URL returned by the service as a link', async () => {
    const shortUrl = 'http://localhost:8080/api/abc123';
    response$ = of(shortUrl);
    const fixture = TestBed.createComponent(InputUrl);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;

    element.querySelector('input')!.value = 'https://example.com/article';
    element.querySelector('button')!.click();
    fixture.detectChanges();
    const link = element.querySelector('.short-url-result a') as HTMLAnchorElement;

    expect(shortenUrl).toHaveBeenCalledExactlyOnceWith('https://example.com/article');
    expect(link.textContent?.trim()).toBe(shortUrl);
    expect(link.getAttribute('href')).toBe(shortUrl);
    expect(link.target).toBe('_blank');
    expect(link.rel).toBe('noopener noreferrer');
  });
});
