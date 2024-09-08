import {
  Component,
  effect,
  HostBinding,
  input,
  output,
  signal
} from '@angular/core';
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
  onUndone = output<number>();
  private isInitiallyDone = false;

  @HostBinding('style.--checked-color')
  get checkedColor(): string {
    return this.listColor();
  }

  constructor() {
    effect(() => {
      const { done } = this.reminder();
      this.isInitiallyDone = done;
      this.toggled.set(done);
    }, { allowSignalWrites: true });
  }

  toggle(): void {
    this.toggled.update(v => !v);

    if (!this.isInitiallyDone && this.toggled()) {
      setTimeout(() => {
        if (this.toggled()) this.setDone();
      }, 3000);
    }

    if (this.isInitiallyDone && !this.toggled()) {
      this.setUndone();
    }
  }

  private setDone(): void {
    const { id } = this.reminder();
    database.reminders.update(id!, {
      done: true
    });

    this.onDone.emit(this.reminder().id!);
  }

  private setUndone(): void {
    const { id } = this.reminder();
    database.reminders.update(id!, {
      done: false
    });

    this.onUndone.emit(this.reminder().id!);
  }
}
