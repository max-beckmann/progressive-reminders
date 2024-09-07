import { Component, computed, effect, input, signal } from '@angular/core';
import { Item, List } from '../../../../../model';
import { AggregateItemComponent } from '../aggregate-item.component';
import { RouterLink } from '@angular/router';
import { database } from '../../../../../database';

@Component({
  selector: 'app-inline-list',
  standalone: true,
  imports: [
    AggregateItemComponent,
    RouterLink,
  ],
  templateUrl: './inline-list.component.html',
  styleUrl: './inline-list.component.scss'
})
export class InlineListComponent {
  list = input.required<List>();
  count = signal<number>(0);

  get link(): string {
    return `/list/${this.list().id}`
  }

  aggregateItem = computed<Item>(() => {
    const { title, icon, color } = this.list();

    return {
      title,
      subtitle: this.count().toString(),
      icon: {
        type: icon,
        backgroundColor: color
      },
      hasArrow: true
    }
  });

  constructor() {
    effect(() => {
      if (this.list() !== undefined) {
        void this.initCount();
      }
    });
  }

  private async initCount() {
    const count = await database.reminders.where('associatedList').equals(this.list().id!).count()
    this.count.set(count);
  }
}
