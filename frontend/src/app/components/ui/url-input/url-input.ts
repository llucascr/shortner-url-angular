import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-url-input',
  templateUrl: './url-input.html',
  styleUrl: './url-input.css',
})
export class UrlInput {
  private readonly inputElement = viewChild.required<ElementRef<HTMLInputElement>>('urlInput');

  get value(): string {
    return this.inputElement().nativeElement.value;
  }
}
