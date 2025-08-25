import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user-form',
    loadComponent: () => import('./user-form/user-form.component').then(c => c.UserFormComponent)
  },
  {
    path: '',
    redirectTo: '/user-form',
    pathMatch: 'full'
  }
];
