import { Component } from '@angular/core';
import { ContainerComponent } from '../../container/container.component';
import { RouterLink } from '@angular/router';
import { ListTileComponent } from '../../list-tile/list-tile.component';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { ListComponent } from '../../list/list.component';
import { IconType } from '../../icon/icon.component';
import {
  BottomNavigationComponent
} from '../../bottom-navigation/bottom-navigation.component';

@Component({
  selector: 'app-main-overview-page',
  standalone: true,
  imports: [
    ContainerComponent,
    RouterLink,
    ListTileComponent,
    SearchBarComponent,
    ListComponent,
    BottomNavigationComponent
  ],
  templateUrl: './main-overview-page.component.html',
  styleUrl: './main-overview-page.component.scss'
})
export class MainOverviewPageComponent {

  protected readonly IconType = IconType;
}
