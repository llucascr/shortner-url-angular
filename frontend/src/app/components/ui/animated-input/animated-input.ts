import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-orb-input',
  templateUrl: './animated-input.html',
  styleUrl: './animated-input.css',
})
export class OrbInput {
  private readonly inputElement = viewChild.required<ElementRef<HTMLInputElement>>('urlInput');
  private readonly destroyRef = inject(DestroyRef);
  protected readonly placeholder = signal('https://exemplo.com');
  protected readonly animate = signal(false);

  get value(): string {
    return this.inputElement().nativeElement.value;
  }

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      this.animate.set(true);
      this.placeholder.set('|');
      const placeholders = [
        'https://exemplo.com',
        'Cole sua URL aqui...',
        'Qual link vamos encurtar?',
      ];
      let index = 0;
      let length = 0;
      let timer: ReturnType<typeof setTimeout>;

      const typeNext = () => {
        const text = placeholders[index];
        length += 1;
        const complete = length === text.length;
        this.placeholder.set(text.slice(0, length) + (complete ? '' : '|'));

        if (complete) {
          timer = setTimeout(() => {
            index = (index + 1) % placeholders.length;
            length = 0;
            this.placeholder.set('|');
            timer = setTimeout(typeNext, 75);
          }, 2200);
        } else {
          timer = setTimeout(typeNext, 75);
        }
      };

      timer = setTimeout(typeNext, 75);
      this.destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }
}
