import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./historic-site.page').then( m => m.HistoricSitePage)
  },
  {
    path: 'show/:id',
    loadComponent: () => import('./historic-site-show/historic-site-show.page').then( m => m.HistoricSiteShowPage)
  }
];
