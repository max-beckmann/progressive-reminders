import { Component, computed, input, signal } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import {
  AggregateItemComponent
} from '../../aggregate-items/aggregate-item.component';
import { Item, List } from '../../../../../model';
import { database } from '../../../../../database';
import { AggregateComponent } from '../../aggregate/aggregate.component';
import { IconComponent, IconType } from '../../icon/icon.component';

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
  selectedListId = input.required<string>();
  listOptions = signal<List[]>([]);
  selected = computed<List>(() => {
    return this.listOptions().filter(option => this.isSelected(option))[0];
  });

  constructor() {
    void this.init();
  }

  select(index: number) {
  }

  private async init(): Promise<void> {
    this.listOptions.set(await database.lists.toArray());
  }

  protected isSelected(option: List) {
    return option.id === Number(this.selectedListId());
  }

  protected toAggregateItem(list: List): Item {
    return {
      title: list.title,
      icon: {
        type: list.icon,
        backgroundColor: list.color
      }
    }
  }

  protected readonly IconType = IconType;
}
