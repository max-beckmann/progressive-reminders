import { Component, computed, input } from '@angular/core';

export enum IconType {
  CALENDAR,
  FLAG,
  CHECKMARK,
  PLUS,
  CHEVRON_RIGHT
}

const iconTypeToSrcMap = new Map<IconType, string>([
  [IconType.CALENDAR, 'calendar.circle.fill.svg'],
  [IconType.FLAG, 'flag.circle.fill.svg'],
  [IconType.CHECKMARK, 'checkmark.circle.fill.svg'],
  [IconType.PLUS, 'plus.circle.fill.svg'],
  [IconType.CHEVRON_RIGHT, 'chevron.right.svg']
]);

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  type = input.required<IconType>();
  protected src = computed<string>(() => {
    const m = iconTypeToSrcMap.get(this.type());
    return `/assets/icons/${m}`;
  });
}
