import { Routes } from '@angular/router';

export const ENERGY_MONITORING_ROUTES: Routes = [
  {
    path: 'energy-monitoring/dashboard',
    data: { title: 'Energy Dashboard' },
    loadComponent: () =>
      import('../pages/dashboard/energy-dashboard-page.component').then(
        (m) => m.EnergyDashboardPageComponent
      ),
  },
  {
    path: 'energy-monitoring/history',
    data: { title: 'Energy History' },
    loadComponent: () =>
      import('../pages/history/energy-history-page.component').then(
        (m) => m.EnergyHistoryPageComponent
      ),
  },
];
