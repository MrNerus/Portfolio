import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Hero {
  private contentService = inject(ContentService);
  heading = signal('');
  subheading = signal('');

  constructor() {
    const content = this.contentService.getContent();

    (content as Observable<any>).subscribe(() => {
        const heroContent = this.contentService.getHeroContent();
        this.heading.set(heroContent.heading);
        this.subheading.set(heroContent.subheading);
      });
  }
}
