import { Component, input } from '@angular/core';
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
  hasNewListButton = input<boolean>(true);
  icon = input<Icon>(defaultIcons['plus']);
}
