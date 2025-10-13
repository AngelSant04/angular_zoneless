import { Routes } from '@angular/router';
import BasicPage from './pages/basic-page/basic-page';

export const routes: Routes = [
  {
    path: 'basic',
    title: 'Pipes Básicos',
    loadComponent: () => import('./pages/basic-page/basic-page'),
  },
  {
    path: 'numbers',
    title: 'Pipes de Números',
    loadComponent: () => import('./pages/numbers-page/numbers-page'),
  },
  {
    path: 'uncommon',
    title: 'Pipes Poco Comunes',
    loadComponent: () => import('./pages/uncommon-page/uncommon-page'),
  },
  {
    path: 'custom',
    title: 'Pipes Personalizados',
    loadComponent: () => import('./pages/custom-page/custom-page'),
  },
  {
    path: '**',
    redirectTo: 'basic',
  },
];
