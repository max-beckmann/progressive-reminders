import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = input.required<string>();
  showArrowLeft = input<boolean>(false);
  leftButtonText = input<string>();
  onLeftButton = output();
  rightButtonText = input<string>();
  onRightButton = output();
  showOptionsButton = input<boolean>(false);
  onOptionsButton = output();
}
