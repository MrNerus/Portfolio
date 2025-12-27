import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  Renderer2,
  ViewChild,
  effect,
  inject,
  input,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { SvgPath } from '../svg-path/svg-path';
import { Card } from '../card/card';
import { PathInterface } from '../path.interface';
import { Point } from '../point.interface';

@Component({
  selector: 'app-info',
  imports: [SvgPath, Card],
  templateUrl: './info.html',
  styleUrl: './info.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Info implements AfterViewInit {
  @ViewChild('node') nodeRef!: ElementRef;
  @ViewChild(Card) cardComponent!: Card;

  // Inputs for dynamic content
  title = input<string>();
  subtitle = input<string>();
  description = input<string>();
  image = input<string>();
  tags = input<string[]>();
  index = input<number>(0);
  allowBodyInteraction = input<boolean>(false);

  cardState = signal<{ position: Point; tilt: number }>({
    position: { x: 0, y: 0 },
    tilt: 0,
  });

  smoothTilt = signal(0);

  pathValue = signal<PathInterface>({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    direction: 1,
  });
  cardDimensions = signal<{ width: number; height: number }>({ width: 0, height: 0 });

  constructor(private injector: Injector) { }

  private renderer = inject(Renderer2);

  ngAfterViewInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        if (!this.cardComponent || !this.nodeRef) {
          return;
        }
        this.cardDimensions.set(this.cardComponent.dimensions());
        const nodeEl = this.nodeRef.nativeElement;

        const nodeCenter = {
          x: nodeEl.offsetLeft + nodeEl.offsetWidth / 2,
          y: nodeEl.offsetTop + nodeEl.offsetHeight / 2
        };

        const isEven = this.index() % 2 === 0;
        const cardWidth = this.cardDimensions().width || 300; // Fallback if not yet measured
        const gap = 50;

        // Calculate target position relative to container
        // If even (left): center - cardWidth - gap
        // If odd (right): center + gap
        const targetX = isEven ? (nodeCenter.x - cardWidth - gap) : (nodeCenter.x + gap);
        const targetY = nodeCenter.y - this.cardDimensions().height / 2;

        const currentPos = this.cardState().position;
        // Initialize if at 0,0
        if (currentPos.x === 0 && currentPos.y === 0) {
          this.cardState.set({
            position: { x: targetX, y: targetY },
            tilt: 0
          });
        }

        const cardPos = this.cardState().position;

        this.pathValue.set({
          startX: nodeCenter.x,
          startY: nodeCenter.y,
          endX: cardPos.x + (isEven ? cardWidth : 0),
          endY: cardPos.y + this.cardDimensions().height / 2,
          direction: isEven ? -1 : 1,
        });
      }, { allowSignalWrites: true });
    });
  }

  onMouseDown(event: MouseEvent): void {
    if (!this.cardComponent) {
      return;
    }
    const target = event.target as HTMLElement;
    // If the user clicks on text that allows interaction, don't start dragging
    // and don't prevent default (so text selection works).
    if (target.classList.contains('allow-interaction') || target.closest('.allow-interaction')) {
      return;
    }

    event.preventDefault();
    const cardPos = this.cardState().position;
    const offsetX = event.clientX - cardPos.x;
    const offsetY = event.clientY - cardPos.y;
    let prevX = event.clientX;
    let prevTime = performance.now();
    let animationFrameId: number;
    let isDragging = true;

    const animate = () => {
      const currentTilt = this.smoothTilt();
      const targetTilt = this.cardState().tilt;
      const newTilt = currentTilt + (targetTilt - currentTilt) * 0.1;
      this.smoothTilt.set(newTilt);

      if (isDragging || Math.abs(newTilt - targetTilt) > 0.01) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const mouseMoveListener = this.renderer.listen('window', 'mousemove', (e: MouseEvent) => {
      const currentTime = performance.now();
      const dt = currentTime - prevTime;
      const dx = e.clientX - prevX;
      const velocity = Math.abs(dx / dt);
      const maxTilt = 20;
      const tiltAngle = Math.min(velocity * maxTilt, maxTilt);
      const sign = dx > 0 ? 1 : -1;

      this.cardState.set({
        position: { x: e.clientX - offsetX, y: e.clientY - offsetY },
        tilt: tiltAngle * sign,
      });

      prevX = e.clientX;
      prevTime = currentTime;
    });

    const mouseUpListener = this.renderer.listen('window', 'mouseup', () => {
      isDragging = false;
      this.cardState.set({ ...this.cardState(), tilt: 0 });
      mouseMoveListener();
      mouseUpListener();
    });

    animate();
  }
}
