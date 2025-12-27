import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { Point } from '../point.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  @ViewChild('box', { static: true }) boxRef!: ElementRef<HTMLElement>;
  position = input.required<Point>();
  tilt = input<number>(0);

  title = input<string>();
  subtitle = input<string>();
  description = input<string>();
  image = input<string>();
  tags = input<string[]>();
  allowBodyInteraction = input<boolean>(false);

  moved = output<Point>();

  isDragging = signal(false);
  private renderer = inject(Renderer2);
  public hostElement = inject(ElementRef);
  public dimensions = signal<{ width: number; height: number }>({ width: 0, height: 0 });

  private resizeObserver?: ResizeObserver;

  regex = /^(.*?)\:\s+(https?:\/\/\S+)$/;

  ngAfterViewInit() {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const rect = entry.contentRect;
        this.dimensions.set({ width: rect.width, height: rect.height });
      }
    });
    this.resizeObserver.observe(this.boxRef.nativeElement);

  }
  boxStyles = computed(() => {
    const pos = this.position();
    const tilt = this.tilt();
    return {
      left: `${pos.x}px`,
      top: `${pos.y}px`,
      transform: `rotate(${tilt}deg)`,
    };
  });

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }


  isLabelUrl(tag: string): boolean {
    return this.regex.test(tag);
  }

  getLabel(tag: string): string {
    const match = tag.match(this.regex);
    return match ? match[1] : tag;
  }

  getUrl(tag: string): string {
    const match = tag.match(this.regex); return match ? match[2] : '';
  }
}


