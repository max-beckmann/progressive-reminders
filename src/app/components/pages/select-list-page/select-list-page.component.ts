import { Component, computed, signal } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import {
  AggregateItemComponent
} from '../../aggregate-items/aggregate-item.component';
import { Item, List, Reminder } from '../../../../../model';
import { database } from '../../../../../database';
import { AggregateComponent } from '../../aggregate/aggregate.component';
import { IconComponent, IconType } from '../../icon/icon.component';
import { Router } from '@angular/router';
import {
  NewReminderPageComponent
} from '../new-reminder-page/new-reminder-page.component';

@Component({
  selector: 'app-select-list-page',
  standalone: true,
  imports: [
    HeaderComponent,
    AggregateItemComponent,
    AggregateComponent,
    IconComponent
  ],
  templateUrl: './select-list-page.component.html',
  styleUrl: './select-list-page.component.scss'
})
export class SelectListPageComponent {
  static readonly location = '/new-reminder/select-list';
  protected readonly reminder: Reminder;
  listOptions = signal<List[]>([]);
  selected = computed<List | null>(() => {
    return this.listOptions().filter(option => this.isSelected(option))[0];
  });

  constructor(
    private readonly router: Router
  ) {
    void this.init();

    this.reminder = this.router.getCurrentNavigation()?.extras.state as Reminder;
  }

  select(index: number) {
    void this.router.navigate([NewReminderPageComponent.location], {
      state: {
        ...this.reminder,
        associatedList: this.listOptions()[index].id
      }
    });
  }

  goBack() {
    void this.router.navigate([NewReminderPageComponent.location], {
      state: this.reminder
    });
  }

  private async init(): Promise<void> {
    this.listOptions.set(await database.lists.toArray());
  }

  protected isSelected(option: List) {
    return option.id === this.reminder?.associatedList;
  }

  protected toAggregateItem(list: List): Item {
    return {
      title: list.title,
      icon: list.icon
    }
  }

  protected readonly IconType = IconType;
}
