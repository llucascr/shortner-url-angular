import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { InputUrl } from './components/input-url/input-url';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme';

@Component({
  imports: [InputUrl],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly document = inject(DOCUMENT);
  protected readonly theme = signal<Theme>('light');

  constructor() {
    const view = this.document.defaultView;
    const savedTheme = view?.localStorage?.getItem(THEME_STORAGE_KEY);
    const systemTheme: Theme = view?.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    this.applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : systemTheme);
  }

  protected toggleTheme(): void {
    this.applyTheme(this.theme() === 'dark' ? 'light' : 'dark', true);
  }

  private applyTheme(theme: Theme, persist = false): void {
    this.theme.set(theme);
    this.document.documentElement.dataset['theme'] = theme;

    if (persist) {
      this.document.defaultView?.localStorage?.setItem(THEME_STORAGE_KEY, theme);
    }
  }
}
