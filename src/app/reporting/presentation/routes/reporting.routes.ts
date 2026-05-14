import { Routes } from '@angular/router';

export const REPORTING_ROUTES: Routes = [
  {
    path: 'reporting/reports',
    data: { title: 'Reports' },
    loadComponent: () =>
      import('../pages/reports/reports-page.component').then(
        (m) => m.ReportsPageComponent
      ),
  },
  {
    path: 'reporting/goals',
    data: { title: 'Goals' },
    loadComponent: () =>
      import('../pages/goals/goals-page.component').then(
        (m) => m.GoalsPageComponent
      ),
  },
];
