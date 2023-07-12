import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
      },
      {
        path: 'signup',
        loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
      },


      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',

      },
    ],
  },


  // {
  //   path: '',
  //   redirectTo: '/auth/login',
  //   pathMatch: 'full',
  // },
];
