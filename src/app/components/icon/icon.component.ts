import { Component, HostBinding, input } from '@angular/core';
import { Icon } from '../../../../model';
import { Colors } from '../../enums/colors';

export enum IconType {
  LIST = 'list',
  CALENDAR = 'calendar',
  FLAG = 'flag',
  CHECKMARK = 'checkmark',
  PLUS = 'plus',
  CHEVRON_RIGHT = 'chevron_right',
  MAPPIN = 'mapping',
  BOOKMARK = 'bookmark'
}

export const defaultIcons: Record<string, Icon> = {
  'today': { type: IconType.CALENDAR, backgroundColor: Colors.BLUE },
  'calendar': { type: IconType.CALENDAR, backgroundColor: Colors.RED },
  'flag': { type: IconType.FLAG, backgroundColor: Colors.ORANGE },
  'checkmark': { type: IconType.CHECKMARK, backgroundColor: Colors.GREY },
  'plus': { type: IconType.PLUS, backgroundColor: '#007AFF' },
}

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  data = input.required<Icon>();
  size = input<number>(24);

  @HostBinding('style.width.px')
  get width() {
    return this.size();
  }

  @HostBinding('style.height.px')
  get height() {
    return this.size();
  }

  @HostBinding('style.--factor')
  get factor() {
    return this.size() / 24 * 0.5;
  }

  @HostBinding('style.color')
  get color() {
    return this.data().color;
  }

  @HostBinding('style.backgroundColor')
  get backgroundColor() {
    return this.data().backgroundColor;
  }

  @HostBinding('class.square')
  get isSquare() {
    return this.data().square;
  }

  protected readonly IconType = IconType;
}
