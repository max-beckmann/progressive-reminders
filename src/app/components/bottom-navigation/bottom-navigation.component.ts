import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { defaultIcons, IconComponent } from '../icon/icon.component';

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
  protected readonly defaultIcons = defaultIcons;
}
