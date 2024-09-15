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
  private readonly init;

  date = model<string>('');
  time = model<string>('');

  dateToggle = signal<boolean>(false);
  timeToggle = signal<boolean>(false);

  constructor() {
    this.init = effect(() => this.initialize(this.selectedDate()), { allowSignalWrites: true });

    effect(() => {
      const showDateSelector = this.dateToggle();

      if(showDateSelector) {
        if(this.date() === '') {
          const { date } = transformToStrings(new Date());
          this.date.set(date);
        }
      } else {
        this.timeToggle.set(false);
        this.date.set('');
      }
    }, { allowSignalWrites: true });

    effect(() => {
      const showTimeSelector = this.timeToggle();

      if(showTimeSelector) {
        this.dateToggle.set(true);

        if(this.time() === '') {
          const { time } = transformToStrings(new Date());
          this.time.set(time);
        }
      } else {
        this.time.set('');
      }
    }, { allowSignalWrites: true });

    effect(() => this.updateSelected(this.dateToggle(), this.timeToggle()), { allowSignalWrites: true });
  }

  private initialize(input?: Date): void {
    this.init.destroy();

    if(!input) {
      const { date, time } = transformToStrings(new Date());

      this.date.set(date);
      this.time.set(time);
      return;
    }

    const { date, time } = transformToStrings(input);

    this.dateToggle.set(true);
    this.date.set(date);

    this.timeToggle.set(true);
    this.time.set(time);
  }

  private updateSelected(stateDateToggle: boolean, stateTimeToggle: boolean): void {
    if(!stateDateToggle) {
      this.selectedDate.set(undefined);
      return;
    }

    if(!stateTimeToggle) {
      this.selectedDate.set(transformToDate(this.date()));
      return;
    }

    this.selectedDate.set(transformToDate(this.date(), this.time()));
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
