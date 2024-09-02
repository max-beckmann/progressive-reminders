import { Component } from '@angular/core';
import { AggregateComponent } from '../../aggregate/aggregate.component';
import { ContainerComponent } from '../../container/container.component';
import { HeaderComponent } from '../../header/header.component';
import { Aggregate, AggregateType } from '../../../../../model';

@Component({
  selector: 'app-new-reminder-page',
  standalone: true,
  imports: [
    AggregateComponent,
    ContainerComponent,
    HeaderComponent
  ],
  templateUrl: './new-reminder-page.component.html',
  styleUrl: './new-reminder-page.component.scss'
})
export class NewReminderPageComponent {
  baseInputs: Aggregate = {
    type: AggregateType.INPUTS,
    items: [
      {
        placeholder: 'Titel',
      },
      {
        placeholder: 'Notizen',
        multiline: true
      }
    ]
  }
  detailsLink: Aggregate = {
    type: AggregateType.LINKS,
    items: [
      {
        title: 'Details',
        location: '/new-reminder/details'
      }
    ]
  }
}
