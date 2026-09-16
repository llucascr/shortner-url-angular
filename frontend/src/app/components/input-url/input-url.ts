import { HttpErrorResponse } from '@angular/common/http';
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
  protected readonly errorMessage = signal<string | null>(null);

  protected shorten(url: string): void {
    const originalUrl = url.trim();

    if (!originalUrl) return;

    this.shortenedUrl.set(null);
    this.errorMessage.set(null);
    this.shortnerUrl.shortenUrl(originalUrl).subscribe({
      next: (shortUrl) => {
        this.shortenedUrl.set(shortUrl.trim());
      },
      error: (error) => {
        this.errorMessage.set(
          this.isRateLimitError(error)
            ? 'Limite de solicitações atingido. Aguarde 30 segundos e tente novamente.'
            : 'Não foi possível encurtar a URL. Tente novamente.',
        );
      },
    });

    this.urlSubmitted.emit(originalUrl);
  }

  private isRateLimitError(error: unknown): boolean {
    if (!(error instanceof HttpErrorResponse)) return false;
    if (error.status === 429) return true;

    const responseBody =
      typeof error.error === 'string' ? error.error : JSON.stringify(error.error ?? '');

    return /rate.?limiter|too many requests|does not permit further calls/i.test(responseBody);
  }
}
