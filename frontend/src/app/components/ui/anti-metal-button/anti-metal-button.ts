import { Component, input } from '@angular/core';

@Component({
  selector: 'button[appAntiMetalButton]',
  templateUrl: './anti-metal-button.html',
  styleUrl: './anti-metal-button.css',
})
export class AntiMetalButton {
  readonly accentFrom = input('#d6f54a');
  readonly accentTo = input('#c5ea2c');
  readonly dotColor = input('#0f0f0f');

  protected readonly chevrons = [0, 1, 2, 3, 4];
  protected readonly dots = [
    { cx: 2, cy: 2, delay: 0 },
    { cx: 5, cy: 5, delay: 0.05 },
    { cx: 8, cy: 8, delay: 0.1 },
    { cx: 5, cy: 11, delay: 0.15 },
    { cx: 2, cy: 14, delay: 0.2 },
    { cx: 6, cy: 2, delay: 0.05 },
    { cx: 9, cy: 5, delay: 0.1 },
    { cx: 12, cy: 8, delay: 0.15 },
    { cx: 9, cy: 11, delay: 0.2 },
    { cx: 6, cy: 14, delay: 0.25 },
  ];
}
