import { Component, output } from '@angular/core';
import { ContainerComponent } from '../../container/container.component';

@Component({
  selector: 'app-color-selection',
  standalone: true,
  imports: [
    ContainerComponent,
  ],
  templateUrl: './color-selection.component.html',
  styleUrl: './color-selection.component.scss'
})
export class ColorSelectionComponent {
  protected readonly colorOptions = ['#FE3C30', '#FE9500', '#FECC02', '#19C759', '#51AAF2', '#007AFF', '#5756D5', '#EA426A', '#BF77DB', '#9D8563', '#5B6670', '#D9A69E'];
  selected = output<string>();

  pick(index: number) {
    this.selected.emit(this.colorOptions[index]);

    document.querySelectorAll('.option').forEach((option, i) => {
      i == index ? option.classList.add('selected') : option.classList.remove('selected');
    });
  }
}
