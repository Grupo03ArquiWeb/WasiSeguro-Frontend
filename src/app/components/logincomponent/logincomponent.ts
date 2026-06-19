import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/authService';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-logincomponent',
  imports: [FormsModule, MatIconModule],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css',
})
export class Logincomponent {
  email = '';
  password = '';

  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    this.loading = true;
    this.error = '';

    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => {
          console.log('Login correcto');

          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.error = 'Correo o contraseña incorrectos';
          } else if (err.status === 0) {
            this.error = 'No se pudo conectar con el servidor';
          } else {
            this.error = 'Ocurrió un error inesperado';
          }

          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
