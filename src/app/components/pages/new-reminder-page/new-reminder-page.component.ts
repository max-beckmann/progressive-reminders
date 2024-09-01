import { Component } from '@angular/core';
import { AggregateComponent } from '../../aggregate/aggregate.component';
import { ContainerComponent } from '../../container/container.component';
import { HeaderComponent } from '../../header/header.component';
import { RemindersService } from '../../../services/reminders.service';
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
  protected readonly baseInputs: Aggregate = {
    type: AggregateType.INPUTS,
    items: [
      {
        placeholder: 'Titel',
      },
      {
        placeholder: 'Notizen',
      }
    ],
  };

  constructor(private readonly remindersService: RemindersService) {
  }

  addNew() {
    this.remindersService.add({
      title: 'Test',
      notes: ''
    })
  }
}
