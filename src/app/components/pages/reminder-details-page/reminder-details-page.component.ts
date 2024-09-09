import { Component } from '@angular/core';
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
  protected readonly reminder: Reminder;

  protected hightlightToggleIcon = {
    type: IconType.FLAG,
    backgroundColor: 'orange'
  };

  constructor(
    protected readonly router: Router
  ) {
    this.reminder = this.router.getCurrentNavigation()?.extras.state as Reminder;
  }

  applyChanges() {
    void this.router.navigate([NewReminderPageComponent.location], {
      state: this.reminder!
    });
  }
}
