import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ContainerComponent } from '../../container/container.component';
import {
  InlineToggleComponent
} from '../../aggregate-items/inline-toggle/inline-toggle.component';
import { IconType } from '../../icon/icon.component';

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
  protected readonly dateToggle = {
    title: 'Datum',
    icon: { type: IconType.CALENDAR, backgroundColor: 'red' }
  };
  protected readonly highlightToggle = {
    title: 'Markieren',
    icon: { type: IconType.FLAG, backgroundColor: 'orange' }
  }

  protected readonly IconType = IconType;
}
