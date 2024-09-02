import { Component, computed, input } from '@angular/core';

export enum IconType {
  CALENDAR,
  FLAG,
  CHECKMARK,
  PLUS,
  CHEVRON_RIGHT,
  LIST,
  MAPPIN,
  BOOKMARK
}

const iconTypeToSrcMap = new Map<IconType, string>([
  [IconType.CALENDAR, 'with-background/calendar.circle.fill.svg'],
  [IconType.FLAG, 'with-background/flag.circle.fill.svg'],
  [IconType.CHECKMARK, 'with-background/checkmark.circle.fill.svg'],
  [IconType.PLUS, 'with-background/plus.circle.fill.svg'],
  [IconType.CHEVRON_RIGHT, 'chevron.right.svg'],
  [IconType.LIST, 'list.bullet.svg'],
  [IconType.MAPPIN, 'mapping.svg'],
  [IconType.BOOKMARK, 'bookmark.fill.svg'],
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
