import { Component, computed, signal } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ContainerComponent } from '../../container/container.component';
import {
  InlineToggleComponent
} from '../../aggregate-items/inline-toggle/inline-toggle.component';
import { IconType } from '../../icon/icon.component';
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

@Component({
  selector: 'app-reminder-details-page',
  standalone: true,
  imports: [
    HeaderComponent,
    ContainerComponent,
    InlineToggleComponent,
    ReactiveFormsModule,
    FormsModule,
    DateSelectorComponent
  ],
  templateUrl: './reminder-details-page.component.html',
  styleUrl: './reminder-details-page.component.scss'
})
export class ReminderDetailsPageComponent {
  static readonly location = '/new-reminder/details';
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
    protected readonly router: Router
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

  applyChanges(): void {
    database.reminders.update(this.reminder.id!, {
      date: this.reminder.date,
      highlighted: this.reminder.highlighted
    });

    void this.router.navigateByUrl(this.previousLocation());
  }

  add(): void {
    database.reminders.add(this.reminder);

    void this.router.navigateByUrl('/');
  }
}
