import { Component, computed, effect, model, signal } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ContainerComponent } from '../../container/container.component';
import { IconComponent, IconType } from '../../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { Icon, List } from '../../../../../model';
import { database } from '../../../../../database';
import { Router } from '@angular/router';
import {
  ColorSelectionComponent
} from '../../selection/color/color-selection.component';
import {
  IconSelectionComponent
} from '../../selection/icon/icon-selection.component';

@Component({
  selector: 'app-new-list-page',
  standalone: true,
  imports: [
    HeaderComponent,
    ContainerComponent,
    IconComponent,
    FormsModule,
    ColorSelectionComponent,
    IconSelectionComponent
  ],
  templateUrl: './new-list-page.component.html',
  styleUrl: './new-list-page.component.scss'
})
export class NewListPageComponent {
  title = model<string>('');
  color = signal<string>('#FE3C30');
  icon = signal<IconType>(IconType.LIST);
  iconPreview = computed<Icon>(() => {
    return {
      type: this.icon(),
      backgroundColor: this.color(),
    }
  });

  constructor(private readonly router: Router) {
    effect(() => {
      document.documentElement.style.setProperty('--new-list-color', this.color());
    });
  }

  async add(): Promise<void> {
    const newList: List = {
      title: this.title(),
      icon: this.icon(),
      color: this.color(),
    }

    await database.lists.add(newList);

    await this.router.navigateByUrl('/');
  }
}
