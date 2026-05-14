import { Routes } from '@angular/router';

export const SERVICE_MANAGEMENT_ROUTES: Routes = [
  {
    path: 'service-management/support',
    data: { title: 'Support' },
    loadComponent: () =>
      import('../pages/support/support-page.component').then(
        (m) => m.SupportPageComponent
      ),
  },
  {
    path: 'service-management/maintenance',
    data: { title: 'Maintenance' },
    loadComponent: () =>
      import('../pages/maintenance/maintenance-page.component').then(
        (m) => m.MaintenancePageComponent
      ),
  },
];
