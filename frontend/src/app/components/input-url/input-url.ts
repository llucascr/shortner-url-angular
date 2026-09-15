import { Component, inject, output } from '@angular/core';
import { OrbInput } from '../ui/animated-input/animated-input';
import { AntiMetalButton } from '../ui/anti-metal-button/anti-metal-button';
import { ShortnerUrl } from '../../services/shortner-url';

@Component({
  imports: [AntiMetalButton, OrbInput],
  selector: 'app-input-url',
  templateUrl: './input-url.html',
})
export class InputUrl {
  readonly urlSubmitted = output<string>();
  private readonly shortnerUrl = inject(ShortnerUrl);

  protected shorten(url: string): void {
    const originalUrl = url.trim();

    if (!originalUrl) return;

    this.shortnerUrl.shortenUrl(originalUrl).subscribe({
      next: (shortUrl) => {
        console.log('URL encurtada:', shortUrl);
      },
      error: (error) => {
        console.error('Erro ao encurtar a URL:', error);
      },
    });

    this.urlSubmitted.emit(originalUrl);
  }

}
