import { Component, OnInit } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-homecomponent',
  imports: [Menucomponent, Menucomponent, RouterOutlet, MatIconModule, RouterLink],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.css',
})
export class Homecomponent implements OnInit {
  constructor(private authService: AuthService,
  ) {}
  rol: string | null = null;


  ngOnInit() {
    this.rol = this.authService.showRole();
  }
  getRolTexto(): string {
  switch (this.rol) {
    case 'ROLE_ADMIN':
      return 'Administrador';
    case 'ROLE_USER':
      return 'Usuario';
    case 'ROLE_MODERADOR':
      return 'Moderador';
    default:
      return this.rol ?? 'Sin rol';
  }
}
}
