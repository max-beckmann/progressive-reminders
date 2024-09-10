import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import {
  InlineReminderComponent
} from '../../aggregate-items/inline-reminder/inline-reminder.component';
import { Reminder } from '../../../../../model';
import { database } from '../../../../../database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-done-overview-page',
  standalone: true,
  imports: [
    HeaderComponent,
    InlineReminderComponent
  ],
  templateUrl: './done-overview-page.component.html',
  styleUrl: './done-overview-page.component.scss'
})
export class DoneOverviewPageComponent {
  reminders = signal<Reminder[]>([]);
  protected color = '#666';

  constructor(
    protected readonly router: Router
  ) {
    void this.init();
  }

  protected removeFromList(id: number) {
    this.reminders.update(reminders => reminders.filter(reminder => reminder.id !== id));
  }

  private async init(): Promise<void> {
    const reminders = await database.reminders
      .filter(reminder => reminder.done)
      .toArray();

    this.reminders.set(reminders);
  }
}
