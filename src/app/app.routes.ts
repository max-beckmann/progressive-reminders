import { Routes } from '@angular/router';
import {
  NewPageComponent
} from './components/pages/new-page/new-page.component';
import {
  MainOverviewPageComponent
} from './components/pages/main-overview-page/main-overview-page.component';

export const routes: Routes = [
  { path: '', component: MainOverviewPageComponent },
  { path: 'new', component: NewPageComponent }
];

