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
import { HeaderComponent } from '../../header/header.component';
import { RemindersService } from '../../../services/reminders.service';

@Component({
  selector: 'app-new-reminder-page',
  standalone: true,
  imports: [
    ListComponent,
    ContainerComponent,
    InlineListTileComponent,
    HeaderComponent
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
      value: 'Notizen',
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

  constructor(private readonly remindersService: RemindersService) {
  }

  addNew() {
    this.remindersService.add({
      title: 'Test',
      notes: ''
    })
  }
}
