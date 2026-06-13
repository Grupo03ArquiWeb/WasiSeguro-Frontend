import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logincomponent',
  imports: [FormsModule],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css',
})
export class Logincomponent {
  email = "";
  password = "";

  loading = false;
  error = "";

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    this.loading = true;
    this.error = "";

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
        error: () => {
          this.error = 'Correo o contraseña incorrectos';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
