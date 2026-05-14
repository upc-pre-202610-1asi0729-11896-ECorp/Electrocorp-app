import { Routes } from '@angular/router';

export const IAM_ROUTES: Routes = [
  {
    path: 'iam/login',
    data: { title: 'Login' },
    loadComponent: () =>
      import('../pages/login/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'iam/register',
    data: { title: 'Register' },
    loadComponent: () =>
      import('../pages/register/register-page.component').then(
        (m) => m.RegisterPageComponent
      ),
  },
];
