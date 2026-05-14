import { Routes } from '@angular/router';

export const WORKPLACE_ROUTES: Routes = [
  {
    path: 'workplace',
    data: { title: 'Workplace' },
    loadComponent: () =>
      import('../pages/workplace-overview/workplace-overview-page.component').then(
        (m) => m.WorkplaceOverviewPageComponent
      ),
  },
];
