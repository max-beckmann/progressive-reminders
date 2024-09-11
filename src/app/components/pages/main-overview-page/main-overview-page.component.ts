import { Component, signal } from '@angular/core';
import { ContainerComponent } from '../../container/container.component';
import { RouterLink } from '@angular/router';
import { ListTileComponent } from '../../list-tile/list-tile.component';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { AggregateComponent } from '../../aggregate/aggregate.component';
import {
  BottomNavigationComponent
} from '../../bottom-navigation/bottom-navigation.component';
import { defaultIcons } from '../../icon/icon.component';
import { Aggregate, AggregateType } from '../../../../../model';
import { database } from '../../../../../database';
import { isToday } from '../../../utils/date';

@Component({
  selector: 'app-main-overview-page',
  standalone: true,
  imports: [
    ContainerComponent,
    RouterLink,
    ListTileComponent,
    SearchBarComponent,
    AggregateComponent,
    BottomNavigationComponent
  ],
  templateUrl: './main-overview-page.component.html',
  styleUrl: './main-overview-page.component.scss'
})
export class MainOverviewPageComponent {
  customLists = signal<Aggregate | null>(null);
  todayCount = signal<number>(0);
  highlightedCount = signal<number>(0);

  constructor() {
    void this.init();
  }

  private async init(): Promise<void> {
    this.customLists.set({
      type: AggregateType.LISTS,
      items: await database.lists.toArray()
    });

    void this.initListCounts();
  }

  private async initListCounts(): Promise<void> {
    const todayCount = await database.reminders
      .filter(reminder => reminder.date !== undefined && isToday(new Date(reminder.date)))
      .count();

    this.todayCount.set(todayCount ?? 0);

    const highlightedCount = await database.reminders
      .filter(reminder => reminder.highlighted)
      .count();

    this.highlightedCount.set(highlightedCount ?? 0);
  }

  protected readonly defaultIcons = defaultIcons;
}
