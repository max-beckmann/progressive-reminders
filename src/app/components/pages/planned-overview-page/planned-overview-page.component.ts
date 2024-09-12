import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import {
  InlineReminderComponent
} from '../../aggregate-items/inline-reminder/inline-reminder.component';
import { Reminder } from '../../../../../model';
import { database } from '../../../../../database';
import { Router } from '@angular/router';
import { Colors } from '../../../enums/colors';

@Component({
  selector: 'app-planned-overview-page',
  standalone: true,
  imports: [
    HeaderComponent,
    InlineReminderComponent
  ],
  templateUrl: './planned-overview-page.component.html',
  styleUrl: './planned-overview-page.component.scss'
})
export class PlannedOverviewPageComponent {
  reminders = signal<Reminder[]>([]);
  protected color = Colors.RED;

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
      .filter(reminder => !reminder.done && reminder.date !== undefined)
      .toArray();

    this.reminders.set(reminders);
  }
}
