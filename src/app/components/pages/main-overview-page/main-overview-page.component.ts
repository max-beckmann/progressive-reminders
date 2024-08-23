import { Component } from '@angular/core';
import { ContainerComponent } from '../../container/container.component';
import { RouterLink } from '@angular/router';
import { ListTileComponent } from '../../list-tile/list-tile.component';

@Component({
  selector: 'app-main-overview-page',
  standalone: true,
  imports: [
    ContainerComponent,
    RouterLink,
    ListTileComponent
  ],
  templateUrl: './main-overview-page.component.html',
  styleUrl: './main-overview-page.component.scss'
})
export class MainOverviewPageComponent {

}
