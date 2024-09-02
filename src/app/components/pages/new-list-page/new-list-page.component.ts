import { Component, effect, signal } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ContainerComponent } from '../../container/container.component';
import { IconComponent, IconType } from '../../icon/icon.component';

@Component({
  selector: 'app-new-list-page',
  standalone: true,
  imports: [
    HeaderComponent,
    ContainerComponent,
    IconComponent
  ],
  templateUrl: './new-list-page.component.html',
  styleUrl: './new-list-page.component.scss'
})
export class NewListPageComponent {
  color = signal<string>('red');
  colorOptions = ['#FE3C30', '#FE9500', '#FECC02', '#19C759', '#51AAF2', '#007AFF', '#5756D5', '#EA426A', '#BF77DB', '#9D8563', '#5B6670', '#D9A69E'];

  constructor() {
    effect(() => {
      document.documentElement.style.setProperty('--new-list-color', this.color());
    });
  }

  pickColor(index: number): void {
    document.querySelectorAll('.color-option').forEach((option, i) => {
      i == index ? option.classList.add('selected') : option.classList.remove('selected');
    });

    this.color.set(this.colorOptions[index])
  }

  protected readonly IconType = IconType;
}
