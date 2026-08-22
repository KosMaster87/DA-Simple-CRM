import { Routes } from '@angular/router';
import { DashboardComponent } from './router-provide/dashboard/dashboard.component';
import { UserComponent } from './router-provide/user/user.component';
import { GreetingComponent } from './router-provide/greeting/greeting.component';
import { MailboxComponent } from './router-provide/mailbox/mailbox.component';
import { FeedbackComponent } from './router-provide/feedback/feedback.component';
import { StatisticsComponent } from './router-provide/statistics/statistics.component';
import { SettingsComponent } from './router-provide/settings/settings.component';
import { HelpComponent } from './router-provide/help/help.component';
import { NotFoundComponent } from './router-provide/not-found/not-found.component';

export const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: GreetingComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'mailbox', component: MailboxComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'help', component: HelpComponent },

  // { path: 'imprint', component: ImprintComponent },

  { path: '**', redirectTo: 'fakePage', pathMatch: 'full' },
  { path: 'fakePage', component: NotFoundComponent },
];
