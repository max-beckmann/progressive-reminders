import { Component, input } from '@angular/core';
import { Input } from '../../../../../model';
import { AggregateItemComponent } from '../aggregate-item.component';

@Component({
  selector: 'app-inline-input',
  standalone: true,
  imports: [
    AggregateItemComponent
  ],
  templateUrl: './inline-input.component.html',
  styleUrl: './inline-input.component.scss'
})
export class InlineInputComponent {
  inputData = input.required<Input>();
}
