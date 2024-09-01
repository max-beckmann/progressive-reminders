import { Component, signal } from '@angular/core';
import { ContainerComponent } from '../../container/container.component';
import { RouterLink } from '@angular/router';
import { ListTileComponent } from '../../list-tile/list-tile.component';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { AggregateComponent } from '../../aggregate/aggregate.component';
import {
  BottomNavigationComponent
} from '../../bottom-navigation/bottom-navigation.component';
import { IconType } from '../../icon/icon.component';
import { Aggregate, AggregateType } from '../../../../../model';
import { database } from '../../../../../database';

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

  constructor() {
    void this.init();
  }

  async init(): Promise<void> {
    this.customLists.set({
      type: AggregateType.LISTS,
      items: await database.lists.toArray()
    });
  }

  protected readonly IconType = IconType;
}
