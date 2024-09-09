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
  private readonly reminderState: Reminder | null = null;
  listOptions = signal<List[]>([]);
  selected = computed<List>(() => {
    return this.listOptions().filter(option => this.isSelected(option))[0];
  });

  constructor(
    private readonly router: Router
  ) {
    void this.init();

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.reminderState = navigation.extras.state as Reminder;
    }
  }

  select(index: number) {
    void this.router.navigate(['/new-reminder'], {
      state: {
        ...this.reminderState,
        associatedList: this.listOptions()[index].id
      }
    });
  }

  private async init(): Promise<void> {
    this.listOptions.set(await database.lists.toArray());
  }

  protected isSelected(option: List) {
    return option.id === this.reminderState?.associatedList;
  }

  protected toAggregateItem(list: List): Item {
    return {
      title: list.title,
      icon: list.icon
    }
  }

  protected readonly IconType = IconType;
}
