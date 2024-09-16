import { Component, computed, signal } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ContainerComponent } from '../../container/container.component';
import {
  InlineToggleComponent
} from '../../aggregate-items/inline-toggle/inline-toggle.component';
import { IconComponent, IconType } from '../../icon/icon.component';
import { Router } from '@angular/router';
import { Reminder } from '../../../../../model';
import {
  NewReminderPageComponent
} from '../new-reminder-page/new-reminder-page.component';
import { Colors } from '../../../enums/colors';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DateSelectorComponent
} from '../../date-selector/date-selector.component';
import { database } from '../../../../../database';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-reminder-details-page',
  standalone: true,
  imports: [
    HeaderComponent,
    ContainerComponent,
    InlineToggleComponent,
    ReactiveFormsModule,
    FormsModule,
    DateSelectorComponent,
    IconComponent
  ],
  templateUrl: './reminder-details-page.component.html',
  styleUrl: './reminder-details-page.component.scss'
})
export class ReminderDetailsPageComponent {
  static readonly location = '/details';
  protected readonly reminder: Reminder;
  previousLocation = signal<string>('');
  isNewReminder = computed<boolean>(() => {
    return this.previousLocation() === NewReminderPageComponent.location;
  });

  protected readonly highlightToggleIcon = {
    type: IconType.FLAG,
    backgroundColor: Colors.ORANGE
  };

  constructor(
    protected readonly router: Router,
    private readonly notificationService: NotificationService
  ) {
    const { extras, previousNavigation } = this.router.getCurrentNavigation()!;
    this.previousLocation.set(previousNavigation?.finalUrl?.toString() ?? '/');
    this.reminder = extras.state as Reminder;
  }

  navigateBack() {
    void this.router.navigate([this.previousLocation()], {
      state: this.reminder
    });
  }

  async applyChanges(): Promise<void> {
    const { associatedNotification: previousNotificationId } = await database.reminders.get(this.reminder.id!) as Reminder;

    if(previousNotificationId) {
      await database.notifications.delete(previousNotificationId);
    }

    let notificationId = undefined;
    if(this.reminder.date) {
      notificationId = await this.notificationService.schedule({
        title: this.reminder.title,
        options: {
          body: this.reminder.date?.toLocaleDateString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        },
        timing: this.reminder.date
      });
    }

    database.reminders.update(this.reminder.id!, {
      title: this.reminder.title,
      notes: this.reminder.notes,
      date: this.reminder.date,
      highlighted: this.reminder.highlighted,
      associatedNotification: notificationId
    });

    void this.router.navigateByUrl(this.previousLocation());
  }

  async add(): Promise<void> {
    if(this.reminder.date) {
      const notificationId = await this.notificationService.schedule({
        title: this.reminder.title,
        options: {
          body: this.reminder.date?.toLocaleDateString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        },
        timing: this.reminder.date
      });
      this.reminder.associatedNotification = notificationId;
    }

    database.reminders.add(this.reminder);

    void this.router.navigateByUrl('/');
  }

  delete(): void {
    if(this.reminder.associatedNotification) {
      database.notifications.delete(this.reminder.associatedNotification);
    }

    database.reminders.delete(this.reminder.id!);

    void this.router.navigateByUrl(this.previousLocation());
  }
}
