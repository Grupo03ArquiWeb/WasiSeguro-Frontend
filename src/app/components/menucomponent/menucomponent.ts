import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-menucomponent',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, RouterLink],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  role: string = '';

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  verificar(): boolean {
    const existe = this.authService.verificar();

    if (existe) {
      this.role = this.authService.showRole() ?? '';
      // console.log(this.role)
    }

    return existe;
  }
  isAdmin() {
    return this.role === 'ROLE_ADMIN';
  }
  isMod() {
    return this.role === 'ROLE_MODERADOR';
  }

  isUser() {
    return this.role === 'ROLE_USER';
  }
}
