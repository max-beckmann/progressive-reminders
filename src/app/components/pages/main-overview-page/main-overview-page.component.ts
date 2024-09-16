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
import { isTodayOrDue } from '../../../utils/date';
import { HeaderComponent } from '../../header/header.component';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-main-overview-page',
  standalone: true,
  imports: [
    ContainerComponent,
    RouterLink,
    ListTileComponent,
    SearchBarComponent,
    AggregateComponent,
    BottomNavigationComponent,
    HeaderComponent
  ],
  templateUrl: './main-overview-page.component.html',
  styleUrl: './main-overview-page.component.scss'
})
export class MainOverviewPageComponent {
  customLists = signal<Aggregate | null>(null);
  todayCount = signal<number>(0);
  plannedCount = signal<number>(0);
  highlightedCount = signal<number>(0);

  constructor(
    private readonly notificationService: NotificationService
  ) {
    void this.init();
    if(!this.notificationService.hasPermission) this.notificationService.requestPermission();
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
      .filter(reminder => !reminder.done && reminder.date !== undefined && isTodayOrDue(new Date(reminder.date)))
      .count();

    this.todayCount.set(todayCount ?? 0);

    const plannedCount = await database.reminders
      .filter(reminder => !reminder.done && reminder.date !== undefined)
      .count();

    this.plannedCount.set(plannedCount ?? 0);

    const highlightedCount = await database.reminders
      .filter(reminder => !reminder.done && reminder.highlighted)
      .count();

    this.highlightedCount.set(highlightedCount ?? 0);
  }

  protected readonly defaultIcons = defaultIcons;
}
