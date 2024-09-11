import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import {
  InlineReminderComponent
} from '../../aggregate-items/inline-reminder/inline-reminder.component';
import { Reminder } from '../../../../../model';
import { database } from '../../../../../database';
import { Router } from '@angular/router';
import { Colors } from '../../../enums/colors';
import { isToday } from '../../../utils/date';

@Component({
  selector: 'app-today-overview-page',
  standalone: true,
  imports: [
    HeaderComponent,
    InlineReminderComponent
  ],
  templateUrl: './today-overview-page.component.html',
  styleUrl: './today-overview-page.component.scss'
})
export class TodayOverviewPageComponent {
  reminders = signal<Reminder[]>([]);
  protected color = Colors.BLUE;

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
      .filter(reminder => reminder.timing !== undefined && isToday(new Date(reminder.timing.date)))
      .toArray();

    this.reminders.set(reminders);
  }
}
