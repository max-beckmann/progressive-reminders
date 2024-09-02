import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ContainerComponent } from '../../container/container.component';
import { IconComponent, IconType } from '../../icon/icon.component';

@Component({
  selector: 'app-new-list-page',
  standalone: true,
  imports: [
    HeaderComponent,
    ContainerComponent,
    IconComponent
  ],
  templateUrl: './new-list-page.component.html',
  styleUrl: './new-list-page.component.scss'
})
export class NewListPageComponent {
  protected readonly IconType = IconType;
}
