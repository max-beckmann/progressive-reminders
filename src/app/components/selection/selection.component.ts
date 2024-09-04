import { AfterViewInit, Component, input, output } from '@angular/core';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [
    ContainerComponent
  ],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss'
})
export class SelectionComponent implements AfterViewInit {
  options = input.required<string[]>();
  modifyOptions = input.required<() => void>();
  selected = output<string>();

  ngAfterViewInit() {
    this.modifyOptions()();
  }

  pick(index: number) {
    this.selected.emit(this.options()[index]);

    document.querySelectorAll('.option').forEach((option, i) => {
      i == index ? option.classList.add('selected') : option.classList.remove('selected');
    });
  }
}
