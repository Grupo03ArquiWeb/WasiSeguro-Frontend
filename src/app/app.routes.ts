import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Rolcomponent } from './components/rolcomponent/rolcomponent';
import { RolList } from './components/rolcomponent/rol-list/rol-list';
import { MapaComponent } from './components/mapa/mapa';
import { Logincomponent } from './components/logincomponent/logincomponent';
import { authGuard } from './guards/auth-guard';
import { RolCrear } from './components/rolcomponent/rol-crear/rol-crear';
import { RolActualizar } from './components/rolcomponent/rol-actualizar/rol-actualizar';
import { VozComponent } from './components/voz/voz';

// imports de suscripcion
import { Suscripcioncomponent } from './components/suscripcioncomponent/suscripcioncomponent';
import { SuscripcionList } from './components/suscripcioncomponent/suscripcion-list/suscripcion-list';
import { SuscripcionCrear } from './components/suscripcioncomponent/suscripcion-crear/suscripcion-crear';
import { SuscripcionActualizar } from './components/suscripcioncomponent/suscripcion-actualizar/suscripcion-actualizar';
import { SuscripcionDetalle } from './components/suscripcioncomponent/suscripcion-detalle/suscripcion-detalle';
import { UsuarioList } from './components/usuariocomponent/usuario-list/usuario-list';
import { UsuarioActualizar } from './components/usuariocomponent/usuario-actualizar/usuario-actualizar';
import { UsuarioCrear } from './components/usuariocomponent/usuario-crear/usuario-crear';
import { SuscripcionReportes } from './components/suscripcioncomponent/suscripcion-reportes/suscripcion-reportes';

import { Plansuscripcioncomponent } from './components/plansuscripcioncomponent/plansuscripcioncomponent';
import { PlansuscripcionCrear } from './components/plansuscripcioncomponent/plansuscripcion-crear/plansuscripcion-crear';
import { PlansuscripcionDetalle } from './components/plansuscripcioncomponent/plansuscripcion-detalle/plansuscripcion-detalle';
import { PlansuscripcionActualizar } from './components/plansuscripcioncomponent/plansuscripcion-actualizar/plansuscripcion-actualizar';
import { PlansuscripcionList } from './components/plansuscripcioncomponent/plansuscripcion-list/plansuscripcion-list';

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
    path: 'usuario',
    canActivate: [authGuard],
    component: Rolcomponent,
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full',
      },
      {
        path: 'crear',
        component: UsuarioCrear,
        data: { roles: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_MODERADOR'] },
      },

      {
        path: 'actualizar/:id',
        component: UsuarioActualizar,
        data: { roles: ['ROLE_ADMIN', 'ROLE_MODERADOR'] },
      },
      { path: 'listar', component: UsuarioList, data: { roles: ['ROLE_ADMIN', 'ROLE_MODERADOR'] } },
    ],
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
      {
        path: 'crear',
        component: RolCrear,
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'actualizar/:id',
        component: RolActualizar,
        data: { roles: ['ROLE_ADMIN'] },
      },
      { path: 'listar', component: RolList, data: { roles: ['ROLE_ADMIN', 'ROLE_MODERADOR'] } },
    ],
  },
  {
    path: 'voz',
    component: VozComponent,
  },
  {
    path: 'mapa',
    component: MapaComponent,
  },
  {
    path: 'suscripcion',
    canActivate: [authGuard],
    component: Suscripcioncomponent,
    data: { roles: ['ROLE_ADMIN', 'ROLE_MODERADOR'] },
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full',
      },
      {
        path: 'crear',
        component: SuscripcionCrear,
        canActivate: [authGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'listar',
        component: SuscripcionList,
        canActivate: [authGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_MODERADOR'] },
      },
      {
        path: 'actualizar/:id',
        component: SuscripcionActualizar,
        canActivate: [authGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_MODERADOR'] },
      },
      {
        path: 'detalle/:id',
        component: SuscripcionDetalle,
        canActivate: [authGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_MODERADOR'] },
      },
      {
        path: 'reportes',
        component: SuscripcionReportes,
        canActivate: [authGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_MODERADOR'] },
      },
    ],
  },
  {
    path: 'plansuscripcion',
    canActivate: [authGuard],
    component: Plansuscripcioncomponent,
    data: { roles: ['ROLE_ADMIN', 'ROLE_MODERADOR'] },
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full',
      },
      {
        path: 'crear',
        component: PlansuscripcionCrear,
        canActivate: [authGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'actualizar/:id',
        component: PlansuscripcionActualizar,
        canActivate: [authGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_MODERADOR'] },
      },
      {
        path: 'listar',
        component: PlansuscripcionList,
        canActivate: [authGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_MODERADOR'] },
      },
      {
        path: 'detalle/:id',
        component: PlansuscripcionDetalle,
        canActivate: [authGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_MODERADOR'] },
      },
    ],
  },
];