import { Component, HostBinding, input } from '@angular/core';
import { Icon } from '../../../../model';
import { Colors } from '../../enums/colors';

export enum IconType {
  LIST = 'list',
  BOOKMARK = 'bookmark',
  MAPPIN = 'mappin',
  GRADUATION = 'graduation',
  DOCUMENT = 'document',
  BOOK = 'book',
  CREDITCARD = 'creditcard',
  DUMBBELL = 'dumbbell',
  FORK_KNIFE = 'fork_knife',
  PILL = 'pill',
  HOUSE = 'house',
  CALENDAR = 'calendar',
  FLAG = 'flag',
  CHECKMARK = 'checkmark',
}

export const defaultIcons: Record<string, Icon> = {
  'today': { type: IconType.CALENDAR, backgroundColor: Colors.BLUE },
  'calendar': { type: IconType.CALENDAR, backgroundColor: Colors.RED },
  'flag': { type: IconType.FLAG, backgroundColor: Colors.ORANGE },
  'checkmark': { type: IconType.CHECKMARK, backgroundColor: Colors.GREY },
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
