import { Component, input } from '@angular/core';
import { IconComponent, IconType } from '../icon/icon.component';
import { Item } from '../../../../model';

@Component({
  selector: 'app-aggregate-item',
  standalone: true,
  imports: [
    IconComponent
  ],
  templateUrl: './aggregate-item.component.html',
  styleUrl: './aggregate-item.component.scss'
})
export class AggregateItemComponent {
  item = input.required<Item>();
  protected readonly IconType = IconType;
}
