import { Routes } from '@angular/router';

export const DEVICE_CONTROL_ROUTES: Routes = [
  {
    path: 'device-control/devices',
    data: { title: 'Devices' },
    loadComponent: () =>
      import('../pages/devices/devices-page.component').then(
        (m) => m.DevicesPageComponent
      ),
  },
  {
    path: 'device-control/routines',
    data: { title: 'Routines' },
    loadComponent: () =>
      import('../pages/routines/routines-page.component').then(
        (m) => m.RoutinesPageComponent
      ),
  },
];
