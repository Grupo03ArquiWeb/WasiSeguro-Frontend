import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
    {
    path: 'home',
    component: Homecomponent,
  },
];
