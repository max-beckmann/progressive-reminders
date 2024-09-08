import { Component, HostBinding, input, output, signal } from '@angular/core';
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
  toggled = signal<boolean>(false);
  onDone = output<number>();

  @HostBinding('style.--checked-color')
  get checkedColor(): string {
    return this.listColor();
  }

  toggle(): void {
    this.toggled.update(v => !v);

    if (this.toggled()) {
      setTimeout(() => {
        if (this.toggled()) this.setDone();
      }, 3000);
    }
  }

  private setDone(): void {
    const { id } = this.reminder();
    database.reminders.update(id!, {
      done: true
    });

    this.onDone.emit(this.reminder().id!);
  }
}
