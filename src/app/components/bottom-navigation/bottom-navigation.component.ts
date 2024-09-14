import {
  Component,
  effect,
  ElementRef,
  HostBinding,
  input,
  viewChild
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { defaultIcons, IconComponent } from '../icon/icon.component';
import { Icon } from '../../../../model';

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [
    RouterLink,
    IconComponent
  ],
  templateUrl: './bottom-navigation.component.html',
  styleUrl: './bottom-navigation.component.scss'
})
export class BottomNavigationComponent {
  color = input<string | undefined>(undefined);
  currentList = input<number | null>(null);
  addIcon = viewChild<ElementRef<HTMLElement>>('add_icon');

  @HostBinding('style.color') get fontColor(): string {
    return this.color() ?? '';
  }

  constructor() {
    effect(() => {
      if(this.color()) {
        this.addIcon()!.nativeElement.style.backgroundColor = this.color()!;
      }
    })
  }
}
