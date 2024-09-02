import { Component, input } from '@angular/core';
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
  linkData = input.required<Link>();

  get aggregateItem(): Item {
    return {
      title: this.linkData().title,
      subtitle: '',
      hasArrow: true
    }
  }
}
