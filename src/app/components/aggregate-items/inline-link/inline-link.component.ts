import { Component, computed, input } from '@angular/core';
import { AggregateItemComponent } from '../aggregate-item.component';
import { Item, Link } from '../../../../../model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inline-link',
  standalone: true,
  imports: [
    AggregateItemComponent,
    RouterLink
  ],
  templateUrl: './inline-link.component.html',
  styleUrl: './inline-link.component.scss'
})
export class InlineLinkComponent {
  title = input.required<Link['title']>();
  subtitle = input<Link['subtitle']>();
  location = input.required<Link['location']>();
  state = input<Link['state']>();
  icon = input<Link['icon']>();

  aggregateItem = computed<Item>(() => {
    return {
      title: this.title(),
      subtitle: this.subtitle(),
      icon: this.icon(),
      hasArrow: true
    }
  });
}
