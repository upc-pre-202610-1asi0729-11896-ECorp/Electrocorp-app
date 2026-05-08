import { Routes } from '@angular/router';

export const BILLING_ROUTES: Routes = [
  {
    path: 'billing/plans',
    loadComponent: () =>
      import('../pages/plans/plans-page.component').then(
        (m) => m.PlansPageComponent
      ),
  },
];
