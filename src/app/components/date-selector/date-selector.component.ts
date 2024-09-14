import { Component, effect, model, signal } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { FormsModule } from '@angular/forms';
import {
  InlineToggleComponent
} from '../aggregate-items/inline-toggle/inline-toggle.component';
import { IconComponent, IconType } from '../icon/icon.component';
import { Colors } from '../../enums/colors';
import { transformToDate, transformToStrings } from '../../utils/date';

@Component({
  selector: 'app-date-selector',
  standalone: true,
  imports: [
    ContainerComponent,
    FormsModule,
    InlineToggleComponent,
    IconComponent
  ],
  templateUrl: './date-selector.component.html',
  styleUrl: './date-selector.component.scss'
})
export class DateSelectorComponent {
  selectedDate = model.required<Date | undefined>();

  date = model<string>('');
  time = model<string>('');

  showDateSelector = signal<boolean>(false);
  protected showTimeSelector = signal<boolean>(false);
  private isInitialized = false

  constructor() {
    effect(() => {
      const previousDate = this.selectedDate();

      if (!this.isInitialized && previousDate) {
        this.init(previousDate);
        this.showDateSelector.set(true);
        this.showTimeSelector.set(true);
        this.isInitialized = true;
      } else {
        this.isInitialized = true;
      }
    }, { allowSignalWrites: true });

    effect(() => {
      const showDateSelector = this.showDateSelector();

      if(showDateSelector) {
        if(this.date() === '') {
          const { date } = transformToStrings(new Date());
          this.date.set(date);
        }
      } else {
        this.showTimeSelector.set(false);
        this.date.set('');
      }
    }, { allowSignalWrites: true });

    effect(() => {
      const showTimeSelector = this.showTimeSelector();

      if(showTimeSelector) {
        this.showDateSelector.set(true);

        if(this.time() === '') {
          const { time } = transformToStrings(new Date());
          this.time.set(time);
        }
      } else {
        this.time.set('');
      }
    }, { allowSignalWrites: true });

    effect(() => {
      const date = this.date();
      const time = this.time();

      if (date) {
        this.updateSelected(date, time);
      }
    }, { allowSignalWrites: true });
  }

  private init(d: Date): void {
    const { date, time } = transformToStrings(d);
    this.date.set(date);
    this.time.set(time);
  }

  private updateSelected(date: string, time?: string): void {
    this.selectedDate.set(transformToDate(date, time));
  }

  protected readonly dateToggleIcon = {
    type: IconType.CALENDAR,
    backgroundColor: Colors.RED
  };
  protected readonly timeToggleIcon = {
    type: IconType.CALENDAR,
    backgroundColor: Colors.BLUE
  }
}
