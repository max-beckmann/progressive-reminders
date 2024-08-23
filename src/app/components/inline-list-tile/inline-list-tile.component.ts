import { Component, input } from '@angular/core';

@Component({
  selector: 'app-inline-list-tile',
  standalone: true,
  imports: [],
  templateUrl: './inline-list-tile.component.html',
  styleUrl: './inline-list-tile.component.scss'
})
export class InlineListTileComponent {
  name = input.required<string>();
  count = input<number>();
}
