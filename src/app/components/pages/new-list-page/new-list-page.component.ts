import { Component, computed, effect, model, signal } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ContainerComponent } from '../../container/container.component';
import { IconComponent, IconType } from '../../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { Icon, List } from '../../../../../model';
import { database } from '../../../../../database';
import { Router } from '@angular/router';
import { SelectionComponent } from '../../selection/selection.component';

@Component({
  selector: 'app-new-list-page',
  standalone: true,
  imports: [
    HeaderComponent,
    ContainerComponent,
    IconComponent,
    FormsModule,
    SelectionComponent
  ],
  templateUrl: './new-list-page.component.html',
  styleUrl: './new-list-page.component.scss'
})
export class NewListPageComponent {
  title = model<string>('');
  colorOptions = ['#FE3C30', '#FE9500', '#FECC02', '#19C759', '#51AAF2', '#007AFF', '#5756D5', '#EA426A', '#BF77DB', '#9D8563', '#5B6670', '#D9A69E'];
  color = signal<string>(this.colorOptions[0]);
  iconOptions = Object.keys(IconType);
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
      icon: IconType.LIST,
      color: this.color(),
    }

    await database.lists.add(newList);

    await this.router.navigateByUrl('/');
  }

  protected setOptionBackground(): () => void {
    return () => {
      document.querySelectorAll('.inner').forEach((option, index) => {
        (option as HTMLElement).style.backgroundColor = this.colorOptions[index];
      });
    }
  }
}
