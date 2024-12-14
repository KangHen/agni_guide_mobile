import { Routes } from '@angular/router';
import { authentificateGuard } from './guards/authentificate.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authentificateGuard],
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.routes').then( m => m.routes)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'historic-site',
    canActivate: [authentificateGuard],
    loadChildren: () => import('./pages/historic-site/historic-site.routes').then((m) => m.routes),
  },
  {
    path: 'read-news/:id',
    canActivate: [authentificateGuard],
    loadComponent: () => import('./pages/read-news/read-news.page').then( m => m.ReadNewsPage)
  },
  {
    path: 'product-buy/:id',
    canActivate: [authentificateGuard],
    loadComponent: () => import('./pages/product-buy/product-buy.page').then( m => m.ProductBuyPage)
  }
];
