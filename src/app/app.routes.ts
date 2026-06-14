import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Rolcomponent } from './components/rolcomponent/rolcomponent';
import { RolList } from './components/rolcomponent/rol-list/rol-list';
import { Logincomponent } from './components/logincomponent/logincomponent';
import { authGuard } from './guards/auth-guard';
import { RolCrear } from './components/rolcomponent/rol-crear/rol-crear';
import { RolActualizar } from './components/rolcomponent/rol-actualizar/rol-actualizar';

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
    canActivate: [authGuard],
  },
  {
    path: 'roles',
    canActivate: [authGuard],
    component: Rolcomponent,
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full',
      },
      { path: 'crear', component: RolCrear },
      {
        path: 'actualizar/:id',
        component: RolActualizar,
      },
      { path: 'listar', component: RolList },
    ],
  },
];
