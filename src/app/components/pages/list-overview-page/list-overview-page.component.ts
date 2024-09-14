import { Component, computed, effect, input, signal } from '@angular/core';
import { Icon, List, Reminder } from '../../../../../model';
import { HeaderComponent } from '../../header/header.component';
import { database } from '../../../../../database';
import {
  BottomNavigationComponent
} from '../../bottom-navigation/bottom-navigation.component';
import { IconType } from '../../icon/icon.component';
import { AggregateComponent } from '../../aggregate/aggregate.component';
import {
  InlineReminderComponent
} from '../../aggregate-items/inline-reminder/inline-reminder.component';
import { Router } from '@angular/router';
import {
  OptionsOverlayComponent
} from '../../options-overlay/options-overlay.component';

@Component({
  selector: 'app-list-overview-page',
  standalone: true,
  imports: [
    HeaderComponent,
    BottomNavigationComponent,
    AggregateComponent,
    InlineReminderComponent,
    OptionsOverlayComponent
  ],
  templateUrl: './list-overview-page.component.html',
  styleUrl: './list-overview-page.component.scss'
})
export class ListOverviewPageComponent {
  id = input.required<string>();
  list = signal<List | null>(null);
  reminders = signal<Reminder[]>([]);

  constructor(
    protected readonly router: Router
  ) {
    effect(() => {
      if (this.id()) {
        void this.init(Number(this.id()));
      }
    });
  }

  protected deleteList(): void {
    void database.lists.delete(this.list()?.id!);
    void this.deleteAssociatedReminders();
    void this.router.navigateByUrl('/');
  }

  private async deleteAssociatedReminders(): Promise<void> {
    const reminders = await database.reminders.where('associatedList').equals(this.list()?.id!).toArray();
    const ids = reminders.map(reminder => reminder.id!);
    void database.reminders.bulkDelete(ids);
  }

  protected removeFromList(id: number) {
    this.reminders.update(reminders => reminders.filter(reminder => reminder.id !== id));
  }

  private async init(id: number): Promise<void> {
    const list = await database.lists
      .where('id')
      .equals(id)
      .first()

    if (list) this.list.set(list);

    const reminders = await database.reminders
      .where('associatedList').equals(id)
      .and(reminder => !reminder.done)
      .toArray();

    if (reminders.length > 0) {
      this.reminders.set(reminders);
    }
  }
}
