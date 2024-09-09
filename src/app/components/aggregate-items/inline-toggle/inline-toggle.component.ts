import { Component, computed, input, model } from '@angular/core';
import { AggregateItemComponent } from '../aggregate-item.component';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../icon/icon.component';
import { AggregateItem } from '../../../../../model';

@Component({
  selector: 'app-inline-toggle',
  standalone: true,
  imports: [
    AggregateItemComponent,
    RouterLink,
    IconComponent
  ],
  templateUrl: './inline-toggle.component.html',
  styleUrl: './inline-toggle.component.scss'
})
export class InlineToggleComponent {
  title = input.required<AggregateItem['title']>();
  icon = input<AggregateItem['icon']>();
  squareIcon = computed<AggregateItem['icon'] | null>(() => {
    if (this.icon() === undefined) return null;

    return {
      ...this.icon()!,
      square: true
    }
  });
  status = model<boolean>(false);

  toggle() {
    this.status.update(v => !v);
  }
}
