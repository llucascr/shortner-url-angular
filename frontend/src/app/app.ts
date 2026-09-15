import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { InputUrl } from './components/input-url/input-url';

@Component({
  imports: [Header, InputUrl],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
