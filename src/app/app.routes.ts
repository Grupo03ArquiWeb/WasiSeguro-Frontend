import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Rolcomponent } from './components/rolcomponent/rolcomponent';
import { RolList } from './components/rolcomponent/rol-list/rol-list';
import { Logincomponent } from './components/logincomponent/logincomponent';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Logincomponent,
  },
  {
    path: 'home',
    component: Homecomponent,
  },
  {
    path: 'roles',
    component: Rolcomponent,
    canActivate: [authGuard],
    children: [{ path: 'listar', component: RolList }],
  },
];
