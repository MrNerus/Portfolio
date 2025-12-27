import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PathInterface } from '../path.interface';

@Component({
  selector: 'app-svg-path',
  templateUrl: './svg-path.html',
  styleUrl: './svg-path.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgPath {
  pathValue = input.required<PathInterface>();

  svg_d = computed(() => {
    const path = this.pathValue();
    const { startX, startY, endX, endY, direction } = path;
    const cp1x = startX + direction * 60;
    const cp1y = startY;
    const cp2x = endX - direction * 60;
    const cp2y = endY;
    return `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
  });
}