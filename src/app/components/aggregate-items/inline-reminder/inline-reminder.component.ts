import { Component, computed, input } from '@angular/core';
import { Item, Reminder } from '../../../../../model';
import { AggregateItemComponent } from '../aggregate-item.component';

@Component({
  selector: 'app-inline-reminder',
  standalone: true,
  imports: [
    AggregateItemComponent
  ],
  templateUrl: './inline-reminder.component.html',
  styleUrl: './inline-reminder.component.scss'
})
export class InlineReminderComponent {
  reminder = input.required<Reminder>();

  aggregateItem = computed<Item>(() => {
    return {
      title: this.reminder().title,
      hasArrow: this.reminder().subReminders.length > 0
    }
  });
}
