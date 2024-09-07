import { Component, computed, input, signal } from '@angular/core';
import { Item, List } from '../../../../../model';
import { AggregateItemComponent } from '../aggregate-item.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { database } from '../../../../../database';

@Component({
  selector: 'app-inline-list',
  standalone: true,
  imports: [
    AggregateItemComponent,
    RouterLink,
    AsyncPipe
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
    void this.initCount();
  }

  private async initCount() {
    const count = await database.reminders.where('associatedList').equals(this.list().id!).count()
    this.count.set(count);
  }
}
