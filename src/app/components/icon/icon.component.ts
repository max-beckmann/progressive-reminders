import {
  Component,
  computed,
  ElementRef,
  input,
  OnInit,
  Renderer2
} from '@angular/core';
import { Icon } from '../../../../model';

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

export const defaultIcons: Record<string, Icon> = {
  'calendar': { type: IconType.CALENDAR, backgroundColor: '#FF3B30' },
  'flag': { type: IconType.FLAG, backgroundColor: '#FF9500' },
  'checkmark': { type: IconType.CHECKMARK, backgroundColor: '#666' },
}


const iconTypeToSrcMap = new Map<IconType, string>([
  [IconType.CALENDAR, 'calendar.svg'],
  [IconType.FLAG, 'flag.fill.svg'],
  [IconType.CHECKMARK, 'checkmark.svg'],
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
export class IconComponent implements OnInit {
  data = input.required<Icon>();

  protected src = computed<string>(() => {
    const m = iconTypeToSrcMap.get(this.data().type);
    return `/assets/icons/${m}`;
  });

  constructor(
    private readonly element: ElementRef,
    private readonly renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.renderer.setStyle(this.element.nativeElement, 'background-color', this.data().backgroundColor);
  }
}
