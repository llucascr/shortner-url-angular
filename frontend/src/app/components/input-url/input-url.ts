import { Component, inject, output, signal } from '@angular/core';
import { UrlInput } from '../ui/url-input/url-input';
import { VercelButton } from '../ui/vercel-button/vercel-button';
import { ShortnerUrl } from '../../services/shortner-url';

@Component({
  imports: [UrlInput, VercelButton],
  selector: 'app-input-url',
  styleUrl: './input-url.css',
  templateUrl: './input-url.html',
})
export class InputUrl {
  readonly urlSubmitted = output<string>();
  private readonly shortnerUrl = inject(ShortnerUrl);
  protected readonly shortenedUrl = signal<string | null>(null);

  protected shorten(url: string): void {
    const originalUrl = url.trim();

    if (!originalUrl) return;

    this.shortenedUrl.set(null);
    this.shortnerUrl.shortenUrl(originalUrl).subscribe({
      next: (shortUrl) => {
        this.shortenedUrl.set(shortUrl.trim());
      },
      error: (error) => {
        console.error('Erro ao encurtar a URL:', error);
      },
    });

    this.urlSubmitted.emit(originalUrl);
  }
}
