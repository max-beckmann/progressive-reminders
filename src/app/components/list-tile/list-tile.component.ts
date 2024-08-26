import { Component, input } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { IconType, ListIconComponent } from '../list-icon/list-icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-tile',
  standalone: true,
  imports: [
    ContainerComponent,
    ListIconComponent,
    RouterLink
  ],
  templateUrl: './list-tile.component.html',
  styleUrl: './list-tile.component.scss'
})
export class ListTileComponent {
  name = input.required<string>();
  icon = input.required<IconType>();
  link = input.required<string>();
  count = input<number>();
}
