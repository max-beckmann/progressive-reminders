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
import {
  ListOverviewPageComponent
} from './components/pages/list-overview-page/list-overview-page.component';
import {
  DoneOverviewPageComponent
} from './components/pages/done-overview-page/done-overview-page.component';
import {
  ReminderDetailsPageComponent
} from './components/pages/reminder-details-page/reminder-details-page.component';
import {
  HighlightedOverviewPageComponent
} from './components/pages/highlighted-overview-page/highlighted-overview-page.component';
import {
  TodayOverviewPageComponent
} from './components/pages/today-overview-page/today-overview-page.component';
import {
  PlannedOverviewPageComponent
} from './components/pages/planned-overview-page/planned-overview-page.component';

export const routes: Routes = [
  { path: '', component: MainOverviewPageComponent },
  { path: 'list/today', component: TodayOverviewPageComponent },
  { path: 'list/planned', component: PlannedOverviewPageComponent },
  { path: 'list/highlighted', component: HighlightedOverviewPageComponent },
  { path: 'list/done', component: DoneOverviewPageComponent },
  { path: 'list/:id', component: ListOverviewPageComponent },
  { path: 'new-reminder', component: NewReminderPageComponent },
  { path: 'new-reminder/select-list', component: SelectListPageComponent },
  { path: 'new-reminder/details', component: ReminderDetailsPageComponent },
  { path: 'new-list', component: NewListPageComponent },
];

