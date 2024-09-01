import { Component, input } from '@angular/core';
import { Reminder } from '../../../../../model';

@Component({
  selector: 'app-inline-reminder',
  standalone: true,
  imports: [],
  templateUrl: './inline-reminder.component.html',
  styleUrl: './inline-reminder.component.scss'
})
export class InlineReminderComponent {
  reminder = input.required<Reminder>();
}
