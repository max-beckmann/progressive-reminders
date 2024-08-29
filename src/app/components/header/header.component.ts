import { Component, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  add = output();

  constructor(private readonly router: Router) {
  }

  protected navigateBack() {
    void this.router.navigate(['/']);
  }
}
