import { Component, input } from '@angular/core';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-list-tile',
  standalone: true,
  imports: [
    ContainerComponent
  ],
  templateUrl: './list-tile.component.html',
  styleUrl: './list-tile.component.scss'
})
export class ListTileComponent {
  name = input.required<string>();
  count = input<number>();
}
