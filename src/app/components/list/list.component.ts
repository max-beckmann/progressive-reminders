import { Component, input } from '@angular/core';
import { ListTileComponent } from '../list-tile/list-tile.component';
import {
  InlineListTileComponent
} from '../inline-list-tile/inline-list-tile.component';
import { IconComponent, IconType } from '../icon/icon.component';

export enum ListItemType {
  REMINDER,
  INPUT,
  LINK
}

export type ListItem = {
  type: ListItemType;
  value: string;
  icon?: IconType;
  count?: number;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ListTileComponent,
    InlineListTileComponent,
    IconComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  items = input<ListItem[]>([]);
  protected readonly ListItemType = ListItemType;
}
