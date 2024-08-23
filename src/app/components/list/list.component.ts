import { Component } from '@angular/core';
import { ListTileComponent } from '../list-tile/list-tile.component';
import {
  InlineListTileComponent
} from '../inline-list-tile/inline-list-tile.component';
import { ListIconComponent } from '../list-icon/list-icon.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ListTileComponent,
    InlineListTileComponent,
    ListIconComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
}
