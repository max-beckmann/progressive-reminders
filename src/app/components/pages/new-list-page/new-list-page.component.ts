import { Component, effect, model, signal } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ContainerComponent } from '../../container/container.component';
import { IconComponent, IconType } from '../../icon/icon.component';
import { FormsModule } from '@angular/forms';
import { List } from '../../../../../model';
import { database } from '../../../../../database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list-page',
  standalone: true,
  imports: [
    HeaderComponent,
    ContainerComponent,
    IconComponent,
    FormsModule
  ],
  templateUrl: './new-list-page.component.html',
  styleUrl: './new-list-page.component.scss'
})
export class NewListPageComponent {
  title = model<string>('');
  color = signal<string>('');
  colorOptions = ['#FE3C30', '#FE9500', '#FECC02', '#19C759', '#51AAF2', '#007AFF', '#5756D5', '#EA426A', '#BF77DB', '#9D8563', '#5B6670', '#D9A69E'];

  constructor(private readonly router: Router) {
    this.pickColor(0);

    effect(() => {
      document.documentElement.style.setProperty('--new-list-color', this.color());
    });
  }

  pickColor(index: number): void {
    this.color.set(this.colorOptions[index])

    document.querySelectorAll('.color-option').forEach((option, i) => {
      i == index ? option.classList.add('selected') : option.classList.remove('selected');
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

  protected readonly IconType = IconType;
}
