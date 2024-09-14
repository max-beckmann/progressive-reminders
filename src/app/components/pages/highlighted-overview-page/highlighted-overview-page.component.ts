import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import {
  InlineReminderComponent
} from '../../aggregate-items/inline-reminder/inline-reminder.component';
import { Reminder } from '../../../../../model';
import { database } from '../../../../../database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-highlighted-overview-page',
  standalone: true,
  imports: [
    HeaderComponent,
    InlineReminderComponent
  ],
  templateUrl: './highlighted-overview-page.component.html',
  styleUrl: './highlighted-overview-page.component.scss'
})
export class HighlightedOverviewPageComponent {
  reminders = signal<Reminder[]>([]);
  protected color = '#FF9500';

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
      .filter(reminder => !reminder.done && reminder.highlighted)
      .sortBy('date');

    this.reminders.set(reminders);
  }
}
