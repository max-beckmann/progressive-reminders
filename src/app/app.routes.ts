import { Routes } from '@angular/router';
import {
  NewReminderPageComponent
} from './components/pages/new-reminder-page/new-reminder-page.component';
import {
  MainOverviewPageComponent
} from './components/pages/main-overview-page/main-overview-page.component';
import {
  NewListPageComponent
} from './components/pages/new-list-page/new-list-page.component';
import {
  SelectListPageComponent
} from './components/pages/select-list-page/select-list-page.component';

export const routes: Routes = [
  { path: '', component: MainOverviewPageComponent },
  { path: 'new-reminder', component: NewReminderPageComponent },
  {
    path: 'new-reminder/select-list/:selectedListId',
    component: SelectListPageComponent
  },
  { path: 'new-list', component: NewListPageComponent },
];

