import { Component, computed, HostBinding, input } from '@angular/core';
import { Icon } from '../../../../model';

export enum IconType {
  CALENDAR = 'calendar',
  FLAG = 'flag',
  CHECKMARK = 'checkmark',
  PLUS = 'plus',
  CHEVRON_RIGHT = 'chevron_right',
  LIST = 'list',
  MAPPIN = 'mapping',
  BOOKMARK = 'bookmark'
}

export const defaultIcons: Record<string, Icon> = {
  'today': { type: IconType.CALENDAR, backgroundColor: '#027BFE' },
  'calendar': { type: IconType.CALENDAR, backgroundColor: '#FF3B30' },
  'flag': { type: IconType.FLAG, backgroundColor: '#FF9500' },
  'checkmark': { type: IconType.CHECKMARK, backgroundColor: '#666' },
  'plus': { type: IconType.PLUS, backgroundColor: '#007AFF' },
}


const iconTypeToSrcMap = new Map<IconType, string>([
  [IconType.CALENDAR, 'calendar.svg'],
  [IconType.FLAG, 'flag.fill.svg'],
  [IconType.CHECKMARK, 'checkmark.svg'],
  [IconType.PLUS, 'plus.svg'],
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
  data = input.required<Icon>();

  protected src = computed<string>(() => {
    const m = iconTypeToSrcMap.get(this.data().type);
    return `/assets/icons/${m}`;
  });

  @HostBinding('style.backgroundColor')
  get backgroundColor() {
    return this.data().backgroundColor;
  }
}
