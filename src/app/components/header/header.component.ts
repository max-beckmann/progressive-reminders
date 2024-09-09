import { Component, input, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = input.required<string>();
  leftButtonText = input<string>();
  onLeftButton = output();
  rightButtonText = input<string>();
  onRightButton = output();

  constructor(
    private readonly router: Router
  ) {
  }

  protected navigateBack() {
    void this.router.navigateByUrl('/');
  }
}
