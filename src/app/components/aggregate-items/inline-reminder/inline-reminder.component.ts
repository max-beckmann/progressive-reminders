import { Component, HostBinding, input, signal } from '@angular/core';
import { Reminder } from '../../../../../model';
import { database } from '../../../../../database';

@Component({
  selector: 'app-inline-reminder',
  standalone: true,
  imports: [],
  templateUrl: './inline-reminder.component.html',
  styleUrl: './inline-reminder.component.scss'
})
export class InlineReminderComponent {
  reminder = input.required<Reminder>();
  listColor = input<string>('');
  checked = signal<boolean>(false);

  @HostBinding('style.--checked-color')
  get checkedColor(): string {
    return this.listColor();
  }

  toggle(): void {
    this.checked.update(before => !before);

    setTimeout(() => {
      if (this.checked()) this.setDone();
    }, 3000);
  }

  private setDone(): void {
    const { id } = this.reminder();
    database.reminders.update(id!, {
      done: true
    });
  }
}
