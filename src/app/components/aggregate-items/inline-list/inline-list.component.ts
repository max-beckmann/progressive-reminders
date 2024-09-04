import { Component, input } from '@angular/core';
import { Item, List } from '../../../../../model';
import { AggregateItemComponent } from '../aggregate-item.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inline-list',
  standalone: true,
  imports: [
    AggregateItemComponent,
    RouterLink
  ],
  templateUrl: './inline-list.component.html',
  styleUrl: './inline-list.component.scss'
})
export class InlineListComponent {
  list = input.required<List>();
  count = input<number>();

  get link(): string {
    return `/list/${this.list().id}`
  }

  get aggregateItem(): Item {
    const { title, icon, color } = this.list();

    return {
      title,
      subtitle: '0',
      icon: {
        type: icon,
        backgroundColor: color
      },
      hasArrow: true
    }
  }
}
