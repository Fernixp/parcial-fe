import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Empleados } from './pages/empleados/empleados';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Dashboard },
      { path: 'dashboard', component: Dashboard },
      { path: 'empleados', component: Empleados },
    ],
  },
  { path: '**', redirectTo: '' },
];
