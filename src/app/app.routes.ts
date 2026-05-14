import { Routes } from '@angular/router';

import { IAM_ROUTES } from './iam/presentation/routes/iam.routes';
import { DEVICE_CONTROL_ROUTES } from './device-control/presentation/routes/device-control.routes';
import { ENERGY_MONITORING_ROUTES } from './energy-monitoring/presentation/routes/energy-monitoring.routes';
import { BILLING_ROUTES } from './billing/presentation/routes/billing.routes';
import { NOTIFICATIONS_ROUTES } from './notifications/presentation/routes/notifications.routes';
import { activeSubscriptionGuard } from './shared/application/guards/active-subscription.guard';

const withGuardAndTitle = (routes: Routes): Routes =>
  routes.map((route) => ({
    ...route,
    canActivate: [activeSubscriptionGuard],
  }));

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'iam/login',
    pathMatch: 'full',
  },

  ...IAM_ROUTES,
  ...BILLING_ROUTES,

  {
    path: 'home',
    canActivate: [activeSubscriptionGuard],
    data: { title: 'Home' },
    loadComponent: () =>
      import('./shared/presentation/pages/home/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'about',
    canActivate: [activeSubscriptionGuard],
    data: { title: 'About' },
    loadComponent: () =>
      import('./shared/presentation/pages/about/about-page.component').then(
        (m) => m.AboutPageComponent
      ),
  },

  ...withGuardAndTitle(DEVICE_CONTROL_ROUTES),
  ...withGuardAndTitle(ENERGY_MONITORING_ROUTES),
  ...withGuardAndTitle(NOTIFICATIONS_ROUTES),

  {
    path: '**',
    data: { title: 'Page Not Found' },
    loadComponent: () =>
      import('./shared/presentation/pages/not-found/not-found-page.component').then(
        (m) => m.NotFoundPageComponent
      ),
  },
];
