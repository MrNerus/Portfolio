import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private http = inject(HttpClient);
  private content = signal<any>(null);
  private loaded = false;

  getContent() {
    if (!this.loaded) {
      return this.http.get('/api/content').pipe(
        tap(data => {
          this.content.set(data);
          this.loaded = true;
        })
      );
    }
    return this.content;
  }

  getHeroContent() {
    return this.content()?.hero;
  }
}
