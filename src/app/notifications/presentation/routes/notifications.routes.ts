import { Routes } from '@angular/router';

export const NOTIFICATIONS_ROUTES: Routes = [
  {
    path: 'notifications/alerts',
    data: { title: 'Alerts' },
    loadComponent: () =>
      import('../pages/alerts/alerts-page.component').then(
        (m) => m.AlertsPageComponent
      ),
  },
];
