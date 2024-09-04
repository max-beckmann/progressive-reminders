import { Component, input } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { IconComponent } from '../icon/icon.component';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../model';

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
  icon = input.required<Icon>();
  link = input.required<string>();
  count = input<number>();
}
