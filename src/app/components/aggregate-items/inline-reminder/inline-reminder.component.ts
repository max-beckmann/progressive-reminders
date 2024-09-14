import {
  Component, computed,
  effect,
  HostBinding,
  input, model,
  output,
  signal
} from '@angular/core';
import { Reminder } from '../../../../../model';
import { database } from '../../../../../database';
import { IconComponent } from '../../icon/icon.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  NewReminderPageComponent
} from '../../pages/new-reminder-page/new-reminder-page.component';
import {
  ReminderDetailsPageComponent
} from '../../pages/reminder-details-page/reminder-details-page.component';

@Component({
  selector: 'app-inline-reminder',
  standalone: true,
  imports: [
    IconComponent,
    FormsModule
  ],
  templateUrl: './inline-reminder.component.html',
  styleUrl: './inline-reminder.component.scss'
})
export class InlineReminderComponent {
  reminder = input.required<Reminder>();
  title = model<string>();
  listColor = input<string>('');
  toggled = signal<boolean>(false);
  onDone = output<number>();
  onUndone = output<number>();
  private isInitiallyDone = false;

  isFocused = signal<boolean>(false);
  isHovered = signal<boolean>(false);
  showInfoButton = computed<boolean>(() => {
    return this.isFocused() || this.isHovered();
  });

  @HostBinding('style.--checked-color')
  get checkedColor(): string {
    return this.listColor();
  }

  isDue = computed<boolean>(() => {
    return this.reminder().date !== undefined && this.reminder().date!.getTime() < new Date().getTime();
  })

  constructor(
    private readonly router: Router
  ) {
    effect(() => {
      const { done } = this.reminder();
      this.isInitiallyDone = done;
      this.toggled.set(done);
    }, { allowSignalWrites: true });

    effect(() => {
      if(this.title()) {
        void this.updateTitle(this.title() ?? this.reminder().title);
      }
    });
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

  async updateTitle(value: string): Promise<void> {
    await database.reminders.update(this.reminder().id!, { title: value });
  }

  modifyReminder(): void {
    void this.router.navigate([ReminderDetailsPageComponent.location], {
      state: this.reminder()
    });
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
