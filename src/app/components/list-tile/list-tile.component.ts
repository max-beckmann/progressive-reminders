import { Component, input } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { IconComponent, IconType } from '../icon/icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-tile',
  standalone: true,
  imports: [
    ContainerComponent,
    IconComponent,
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
