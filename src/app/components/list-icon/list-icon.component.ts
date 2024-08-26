import { Component, computed, input } from '@angular/core';

export enum IconType {
  CALENDAR,
  FLAG,
  CHECKMARK
}

const iconTypeToSrcMap = new Map<IconType, string>([
  [IconType.CALENDAR, 'calendar.circle.fill.svg'],
  [IconType.FLAG, 'flag.circle.fill.svg'],
  [IconType.CHECKMARK, 'checkmark.circle.fill.svg']
]);

@Component({
  selector: 'app-list-icon',
  standalone: true,
  imports: [],
  templateUrl: './list-icon.component.html',
  styleUrl: './list-icon.component.scss'
})
export class ListIconComponent {
  type = input.required<IconType>();
  protected src = computed<string>(() => {
    const m = iconTypeToSrcMap.get(this.type());
    return `/assets/icons/${m}`;
  });
}
