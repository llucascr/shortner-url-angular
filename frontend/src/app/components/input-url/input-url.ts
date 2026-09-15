import { Component, output } from '@angular/core';
import { OrbInput } from '../ui/animated-input/animated-input';
import { AntiMetalButton } from '../ui/anti-metal-button/anti-metal-button';

@Component({
  imports: [AntiMetalButton, OrbInput],
  selector: 'app-input-url',
  templateUrl: './input-url.html',
})
export class InputUrl {
  readonly urlSubmitted = output<string>();
}
