import { Routes } from '@angular/router';

// @ts-ignore
export const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.routes').then(m => m.routes)
  }

];
