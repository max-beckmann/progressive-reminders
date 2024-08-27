import { Component, input } from '@angular/core';
import { ListTileComponent } from '../list-tile/list-tile.component';
import {
  InlineListTileComponent
} from '../inline-list-tile/inline-list-tile.component';
import { IconComponent, IconType } from '../icon/icon.component';

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
  icon = input<IconType>(IconType.CALENDAR);
}
