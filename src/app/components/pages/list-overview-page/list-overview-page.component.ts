import { Component, computed, effect, input, signal } from '@angular/core';
import { Icon, List, Reminder } from '../../../../../model';
import { HeaderComponent } from '../../header/header.component';
import { database } from '../../../../../database';
import {
  BottomNavigationComponent
} from '../../bottom-navigation/bottom-navigation.component';
import { IconType } from '../../icon/icon.component';

@Component({
  selector: 'app-list-overview-page',
  standalone: true,
  imports: [
    HeaderComponent,
    BottomNavigationComponent
  ],
  templateUrl: './list-overview-page.component.html',
  styleUrl: './list-overview-page.component.scss'
})
export class ListOverviewPageComponent {
  id = input.required<string>();
  list = signal<List | null>(null);
  reminders = signal<Reminder[]>([]);
  bottomNavigationIcon = computed<Icon>(() => {
    return {
      type: IconType.PLUS,
      backgroundColor: this.list()?.color
    }
  });

  constructor() {
    effect(() => {
      if (this.id()) {
        void this.init(Number(this.id()));
      }
    });
  }

  private async init(id: number): Promise<void> {
    const list = await database.lists
      .where('id')
      .equals(id)
      .first()

    if (list) this.list.set(list);
  }
}
