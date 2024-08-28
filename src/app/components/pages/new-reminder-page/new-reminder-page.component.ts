import { Component } from '@angular/core';
import {
  ListComponent,
  ListItem,
  ListItemType
} from '../../list/list.component';
import { ContainerComponent } from '../../container/container.component';
import {
  InlineListTileComponent
} from '../../inline-list-tile/inline-list-tile.component';
import { IconType } from '../../icon/icon.component';

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
  protected readonly baseInputs: ListItem[] = [
    {
      type: ListItemType.INPUT,
      value: 'Titel',
    },
    {
      type: ListItemType.INPUT,
      value: 'Beschreibung',
    }
  ];
  protected readonly detailsLink: ListItem[] = [
    {
      type: ListItemType.LINK,
      value: 'Details',
      link: '/new-reminder/details'
    }
  ];
  protected readonly associatedListLink: ListItem[] = [
    {
      type: ListItemType.LINK,
      value: 'Liste',
      icon: IconType.FLAG,
      link: '/new-reminder/associated-list'
    }
  ];
}
