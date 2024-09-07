import { Component, computed, model, signal } from '@angular/core';
import { AggregateComponent } from '../../aggregate/aggregate.component';
import { ContainerComponent } from '../../container/container.component';
import { HeaderComponent } from '../../header/header.component';
import {
  Aggregate,
  AggregateType,
  Item,
  List,
  Priority,
  Reminder
} from '../../../../../model';
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
import { FormsModule } from '@angular/forms';
import {
  AggregateItemComponent
} from '../../aggregate-items/aggregate-item.component';
import { database } from '../../../../../database';

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
    InlineReminderComponent,
    FormsModule,
    AggregateItemComponent
  ],
  templateUrl: './new-reminder-page.component.html',
  styleUrl: './new-reminder-page.component.scss'
})
export class NewReminderPageComponent {
  title = model<string>('');
  notes = model<string>('');
  detailsLink: Aggregate = {
    type: AggregateType.LINKS,
    items: [
      {
        title: 'Details',
        location: '/new-reminder/details'
      }
    ]
  };
  selectedList = signal<List | null>(null);
  listSelector = computed<Item>(() => {
    const selectedList = this.selectedList();

    return {
      title: 'Liste',
      subtitle: selectedList?.title ?? 'Keine ausgewählt',
      icon: selectedList ? {
        type: selectedList.icon,
        backgroundColor: selectedList.color
      } : undefined,
      hasArrow: true
    }
  });

  constructor(
    private readonly router: Router
  ) {
    void this.init();
  }

  private async init(): Promise<void> {
    const lists = await database.lists.toArray();

    if (lists.length > 0) {
      this.selectedList.set(lists[0]);
    }
  }

  async add(): Promise<void> {
    const newReminder: Reminder = {
      associatedList: this.selectedList()?.id,
      done: false,
      highlighted: false,
      priority: Priority.NONE,
      title: this.title(),
      notes: this.notes() || undefined,
      subReminders: [],
    }

    await database.reminders.add(newReminder);

    await this.router.navigateByUrl('/');
  }
}
