import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ContainerComponent } from '../../container/container.component';
import {
  InlineToggleComponent
} from '../../aggregate-items/inline-toggle/inline-toggle.component';
import { IconType } from '../../icon/icon.component';
import { Router } from '@angular/router';
import { Reminder } from '../../../../../model';

@Component({
  selector: 'app-reminder-details-page',
  standalone: true,
  imports: [
    HeaderComponent,
    ContainerComponent,
    InlineToggleComponent
  ],
  templateUrl: './reminder-details-page.component.html',
  styleUrl: './reminder-details-page.component.scss'
})
export class ReminderDetailsPageComponent {
  static readonly location = '/new-reminder/details';
  private readonly reminder: Reminder | null = null;

  protected hightlightToggleIcon = {
    type: IconType.FLAG,
    backgroundColor: 'orange'
  };

  constructor(
    private readonly router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.reminder = navigation.extras.state as Reminder;
    }
  }

  setHighlighted(value: boolean): void {
    if (this.reminder) {
      this.reminder.highlighted = value;
    }

    console.log(this.reminder);
  }
}
