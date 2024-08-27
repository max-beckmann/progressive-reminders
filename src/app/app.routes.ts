import { Routes } from '@angular/router';
import {
  NewReminderPageComponent
} from './components/pages/new-reminder-page/new-reminder-page.component';
import {
  MainOverviewPageComponent
} from './components/pages/main-overview-page/main-overview-page.component';

export const routes: Routes = [
  { path: '', component: MainOverviewPageComponent },
  { path: 'new-reminder', component: NewReminderPageComponent }
];

