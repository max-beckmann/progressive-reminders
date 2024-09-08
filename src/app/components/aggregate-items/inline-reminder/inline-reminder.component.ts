import { Component, ElementRef, input } from '@angular/core';
import { Reminder } from '../../../../../model';
import { AggregateItemComponent } from '../aggregate-item.component';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-inline-reminder',
  standalone: true,
  imports: [
    AggregateItemComponent,
    IconComponent
  ],
  templateUrl: './inline-reminder.component.html',
  styleUrl: './inline-reminder.component.scss'
})
export class InlineReminderComponent {
  reminder = input.required<Reminder>();
  listColor = input<string>('');

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
  }

  check() {
    this.elementRef.nativeElement.style.setProperty('--checked-color', this.listColor());
    this.elementRef.nativeElement.querySelector('.check')?.classList.add('checked');
  }
}
