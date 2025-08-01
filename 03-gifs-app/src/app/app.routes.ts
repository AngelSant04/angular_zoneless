import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    // Sin export default en la clase se tendria que cargar de esta manera
    // loadComponent: () =>
    //   import('./gifs/pages/dashboard-page/dashboard-page').then(
    //     (m) => m.DashboardPage
    //   ),
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page'),
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending-page/trending-page'),
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search-page/search-page'),
      },
      {
        path: 'history/:query',
        loadComponent: () => import('./gifs/pages/gif-history/gif-history'),
      },
      {
        path: '**',
        redirectTo: 'trending',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
