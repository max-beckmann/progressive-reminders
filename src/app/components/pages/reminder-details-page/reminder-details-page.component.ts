import { Component, signal } from '@angular/core';
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

@Component({
  selector: 'app-reminder-details-page',
  standalone: true,
  imports: [
    HeaderComponent,
    ContainerComponent,
    InlineToggleComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './reminder-details-page.component.html',
  styleUrl: './reminder-details-page.component.scss'
})
export class ReminderDetailsPageComponent {
  static readonly location = '/new-reminder/details';
  protected readonly reminder: Reminder;

  selectDateActive = false;
  selectedDate = signal<Date>(new Date());
  selectTimeActive = false;
  selectedTime = signal<string>('');

  protected readonly dateToggleIcon = {
    type: IconType.CALENDAR,
    backgroundColor: Colors.RED
  };
  protected readonly timeToggleIcon = {
    type: IconType.CALENDAR,
    backgroundColor: Colors.BLUE
  }
  protected readonly highlightToggleIcon = {
    type: IconType.FLAG,
    backgroundColor: Colors.ORANGE
  };

  constructor(
    protected readonly router: Router
  ) {
    this.reminder = this.router.getCurrentNavigation()?.extras.state as Reminder;

    if (this.reminder.timing) {
      this.selectDateActive = true;
      this.selectedDate.set(this.reminder.timing.date);
    }
  }

  applyChanges() {
    void this.router.navigate([NewReminderPageComponent.location], {
      state: {
        ...this.reminder,
        timing: this.selectDateActive ? {
          date: this.selectedDate()
        } : undefined
      }
    });
  }
}
