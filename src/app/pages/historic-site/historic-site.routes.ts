import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'show/:id',
    loadComponent: () => import('./historic-site-show/historic-site-show.page').then( m => m.HistoricSiteShowPage)
  }
];
