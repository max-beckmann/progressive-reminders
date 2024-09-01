import { Component, input } from '@angular/core';
import {
  Aggregate,
  AggregateItem,
  AggregateType,
  Input,
  List,
  Reminder
} from '../../../../model';
import {
  InlineReminderComponent
} from '../aggregate-items/inline-reminder/inline-reminder.component';
import {
  InlineListComponent
} from '../aggregate-items/inline-list/inline-list.component';
import {
  InlineInputComponent
} from '../aggregate-items/inline-input/inline-input.component';

@Component({
  selector: 'app-aggregate',
  standalone: true,
  imports: [
    InlineReminderComponent,
    InlineListComponent,
    InlineInputComponent
  ],
  templateUrl: './aggregate.component.html',
  styleUrl: './aggregate.component.scss'
})
export class AggregateComponent {
  aggregate = input.required<Aggregate | null>();
  protected readonly AggregateType = AggregateType;

  protected toReminder(item: AggregateItem) {
    return item as unknown as Reminder;
  }

  protected toInput(item: AggregateItem) {
    return item as unknown as Input;
  }

  protected toList(item: AggregateItem) {
    return item as unknown as List;
  }
}
