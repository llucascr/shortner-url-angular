import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ShortnerUrl } from './shortner-url';

describe('ShortnerUrl', () => {
  it('posts the URL as a query parameter and reads the plain-text response', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const service = TestBed.inject(ShortnerUrl);
    const http = TestBed.inject(HttpTestingController);
    const originalUrl = 'https://example.com/page?a=1&b=hello world#section';
    const shortUrl = 'http://localhost:8080/api/abc123';
    let result: string | undefined;

    service.shortenUrl(originalUrl).subscribe((value) => (result = value));

    const request = http.expectOne((req) => req.url === 'http://localhost:8080/api/short');
    expect(request.request.method).toBe('POST');
    expect(request.request.params.get('url')).toBe(originalUrl);
    expect(request.request.body).toBeNull();
    expect(request.request.responseType).toBe('text');
    request.flush(shortUrl, { status: 201, statusText: 'Created' });

    expect(result).toBe(shortUrl);
    http.verify();
  });
});
