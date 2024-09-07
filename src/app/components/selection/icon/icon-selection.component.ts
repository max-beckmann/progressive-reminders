import { Component, ElementRef, output } from '@angular/core';
import { ContainerComponent } from '../../container/container.component';
import { IconComponent, IconType } from '../../icon/icon.component';

@Component({
  selector: 'app-icon-selection',
  standalone: true,
  imports: [
    ContainerComponent,
    IconComponent,
  ],
  templateUrl: './icon-selection.component.html',
  styleUrl: './icon-selection.component.scss'
})
export class IconSelectionComponent {
  protected readonly iconOptions = Object.keys(IconType);
  selected = output<IconType>();

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
  }

  pick(index: number) {
    this.selected.emit(this.toIconType(this.iconOptions[index]));

    this.elementRef.nativeElement.querySelectorAll('.option').forEach((option, i) => {
      i == index ? option.classList.add('selected') : option.classList.remove('selected');
    });
  }

  protected toIconType(value: unknown): IconType {
    return IconType[value as keyof typeof IconType];
  }
}
