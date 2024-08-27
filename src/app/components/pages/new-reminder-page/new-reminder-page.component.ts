import { Component } from '@angular/core';
import { ListComponent } from '../../list/list.component';
import { ContainerComponent } from '../../container/container.component';
import {
  InlineListTileComponent
} from '../../inline-list-tile/inline-list-tile.component';

@Component({
  selector: 'app-new-reminder-page',
  standalone: true,
  imports: [
    ListComponent,
    ContainerComponent,
    InlineListTileComponent
  ],
  templateUrl: './new-reminder-page.component.html',
  styleUrl: './new-reminder-page.component.scss'
})
export class NewReminderPageComponent {
}
