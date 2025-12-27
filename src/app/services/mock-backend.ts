import { HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

const content = {
  hero: {
    heading: 'Hi, I\'m Ard Nerus',
    subheading: 'Perfection is just a mistake that is not found yet.'
  }
};

let called = false;

export function mockBackend(request: HttpRequest<any>) {
  if (request.url.endsWith('/api/content') && !called) {
    called = true;
    return of(new HttpResponse({ status: 200, body: content }));
  }
  return of(new HttpResponse({ status: 404 }));
}
