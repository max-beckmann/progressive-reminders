import { Component, input, signal } from '@angular/core';
import { AggregateItemComponent } from '../aggregate-item.component';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../icon/icon.component';
import { Icon } from '../../../../../model';

interface Toggle {
  title: string;
  icon: Icon;
}

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
  data = input.required<Toggle>();
  toggled = signal<boolean>(false);

  toggle() {
    this.toggled.update(v => !v);
  }
}
