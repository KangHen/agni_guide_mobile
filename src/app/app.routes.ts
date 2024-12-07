import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
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
    loadChildren: () => import('./pages/historic-site/historic-site.routes').then((m) => m.routes),
  },
  {
    path: 'read-news/:id',
    loadComponent: () => import('./pages/read-news/read-news.page').then( m => m.ReadNewsPage)
  },
  {
    path: 'product-buy/:id',
    loadComponent: () => import('./pages/product-buy/product-buy.page').then( m => m.ProductBuyPage)
  },
  {
    path: 'tab4',
    loadComponent: () => import('./tab4/tab4.page').then( m => m.Tab4Page)
  },
];
