import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShortnerUrl {
  private readonly _httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api';

  public shortenUrl(originalUrl: string): Observable<string> {
    return this._httpClient.post(`${this.baseUrl}/short`, null, {
      params: { url: originalUrl },
      responseType: 'text',
    });
  }
}
