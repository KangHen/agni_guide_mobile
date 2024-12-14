import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'first',
    loadComponent: () => import('./splash-first/splash-first.page').then( m => m.SplashFirstPage)
  },
  {
    path: 'second',
    loadComponent: () => import('./splash-second/splash-second.page').then( m => m.SplashSecondPage)
  },
  {
    path: 'third',
    loadComponent: () => import('./splash-third/splash-third.page').then( m => m.SplashThirdPage)
  }
];