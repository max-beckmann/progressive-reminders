import { Component } from '@angular/core';
import { AggregateComponent } from '../../aggregate/aggregate.component';
import { ContainerComponent } from '../../container/container.component';
import { HeaderComponent } from '../../header/header.component';
import {
  Aggregate,
  AggregateType,
  Priority,
  Reminder
} from '../../../../../model';
import { database } from '../../../../../database';
import { Router } from '@angular/router';
import {
  InlineInputComponent
} from '../../aggregate-items/inline-input/inline-input.component';
import {
  InlineLinkComponent
} from '../../aggregate-items/inline-link/inline-link.component';
import {
  InlineListComponent
} from '../../aggregate-items/inline-list/inline-list.component';
import {
  InlineReminderComponent
} from '../../aggregate-items/inline-reminder/inline-reminder.component';

@Component({
  selector: 'app-new-reminder-page',
  standalone: true,
  imports: [
    AggregateComponent,
    ContainerComponent,
    HeaderComponent,
    InlineInputComponent,
    InlineLinkComponent,
    InlineListComponent,
    InlineReminderComponent
  ],
  templateUrl: './new-reminder-page.component.html',
  styleUrl: './new-reminder-page.component.scss'
})
export class NewReminderPageComponent {
  detailsLink: Aggregate = {
    type: AggregateType.LINKS,
    items: [
      {
        title: 'Details',
        location: '/new-reminder/details'
      }
    ]
  }

  constructor(
    private readonly router: Router
  ) {
  }

  async add(): Promise<void> {
    const newReminder: Reminder = {
      associatedList: undefined,
      done: false,
      highlighted: false,
      priority: Priority.NONE,
      title: '',
      subReminders: [],
    }

    await database.reminders.add(newReminder);

    await this.router.navigateByUrl('/');
  }
}
