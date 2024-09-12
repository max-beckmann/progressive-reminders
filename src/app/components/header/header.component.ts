import { Component, Inject, input, output } from '@angular/core';
import { DOCUMENT } from '@angular/common';

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
  private isOverlayActive = false;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document
  ) {
  }

  protected toggleOptionsOverlay(): void {
    this.isOverlayActive = !this.isOverlayActive;
    this.document.querySelector('app-options-overlay')?.classList.toggle('active');
  }
}
