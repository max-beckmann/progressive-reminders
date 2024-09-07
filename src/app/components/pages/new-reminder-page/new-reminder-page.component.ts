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
import { Router, RouterLink } from '@angular/router';
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
    AggregateItemComponent,
    RouterLink
  ],
  templateUrl: './new-reminder-page.component.html',
  styleUrl: './new-reminder-page.component.scss'
})
export class NewReminderPageComponent {
  reminder = computed<Reminder>(() => {
    return {
      associatedList: this.selectedList()?.id,
      done: false,
      highlighted: false,
      priority: Priority.NONE,
      title: this.title(),
      notes: this.notes() || undefined,
      subReminders: [],
    }
  });
  title = model<string>('');
  notes = model<string>('');
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
  detailsLink: Aggregate = {
    type: AggregateType.LINKS,
    items: [
      {
        title: 'Details',
        location: '/new-reminder/details'
      }
    ]
  };

  constructor(
    private readonly router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const { state } = navigation.extras;

      void this.init(state as Reminder);
    }
  }

  async add(): Promise<void> {
    await database.reminders.add(this.reminder());

    await this.router.navigateByUrl('/');
  }

  async openListSelection(): Promise<void> {
    await this.router.navigate(['/new-reminder/select-list'], {
      state: this.reminder()
    });
  }

  private init(reminder: Reminder): void {
    if (reminder) {
      this.title.set(reminder.title);
      if (reminder.notes) this.notes.set(reminder.notes);
      void this.initSelectedList(reminder.associatedList!);

      return;
    }

    void this.initSelectedList();
  }

  private async initSelectedList(id?: number): Promise<void> {
    if (!id) {
      const lists = await database.lists.toArray();
      this.selectedList.set(lists[0]);
      return;
    }

    const selected = await database.lists
      .where('id')
      .equals(id)
      .first()

    if (selected) {
      this.selectedList.set(selected);
    }
  }
}
