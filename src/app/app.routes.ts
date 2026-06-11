import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Rolcomponent } from './components/rolcomponent/rolcomponent';
import { RolList } from './components/rolcomponent/rol-list/rol-list';

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
  {
    path: 'roles',
    component: Rolcomponent,
    children: [
      { path: 'listar', component: RolList },
      // {
      //   path: 'crear',
      //   component: MachineInsert,
      // },
    ],
  }

];
