import { Component, signal } from '@angular/core';
import { AggregateComponent } from '../../aggregate/aggregate.component';
import { ContainerComponent } from '../../container/container.component';
import { HeaderComponent } from '../../header/header.component';
import { List, Priority, Reminder } from '../../../../../model';
import { Router, RouterLink } from '@angular/router';
import {
  InlineInputComponent
} from '../../aggregate-items/inline-input/inline-input.component';
import {
  InlineLinkComponent
} from '../../aggregate-items/inline-link/inline-link.component';
import {
  InlineListComponent
} from '../../aggregate-items/inline-list/inline-list.component';
import {
  InlineReminderComponent
} from '../../aggregate-items/inline-reminder/inline-reminder.component';
import { FormsModule } from '@angular/forms';
import {
  AggregateItemComponent
} from '../../aggregate-items/aggregate-item.component';
import { database } from '../../../../../database';
import {
  SelectListPageComponent
} from '../select-list-page/select-list-page.component';
import {
  ReminderDetailsPageComponent
} from '../reminder-details-page/reminder-details-page.component';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-new-reminder-page',
  standalone: true,
  imports: [
    AggregateComponent,
    ContainerComponent,
    HeaderComponent,
    InlineInputComponent,
    InlineLinkComponent,
    InlineListComponent,
    InlineReminderComponent,
    FormsModule,
    AggregateItemComponent,
    RouterLink
  ],
  templateUrl: './new-reminder-page.component.html',
  styleUrl: './new-reminder-page.component.scss'
})
export class NewReminderPageComponent {
  static readonly location = '/new-reminder';
  selectedList = signal<List | null>(null);
  reminder: Reminder = {
    associatedList: undefined,
    done: false,
    highlighted: false,
    priority: Priority.NONE,
    title: '',
    notes: undefined,
    subReminders: [],
  }

  constructor(
    protected readonly router: Router,
    private readonly notificationService: NotificationService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const { state } = navigation.extras;

      this.reminder = state as Reminder;
    }

    void this.initSelectedList(this.reminder.associatedList);
    if(!this.notificationService.hasPermission) this.notificationService.requestPermission();
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

    await database.reminders.add(this.reminder);

    await this.router.navigateByUrl('/');
  }

  private async initSelectedList(id?: number): Promise<void> {
    if (!id) {
      const lists = await database.lists.toArray();
      this.selectedList.set(lists[0]);
      this.reminder.associatedList = lists[0].id;
      return;
    }

    const selected = await database.lists
      .where('id')
      .equals(id)
      .first()

    if (selected) {
      this.selectedList.set(selected);
      this.reminder.associatedList = selected.id;
    }
  }

  protected readonly SelectListPageComponent = SelectListPageComponent;
  protected readonly ReminderDetailsPageComponent = ReminderDetailsPageComponent;
}
