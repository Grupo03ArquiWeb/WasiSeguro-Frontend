import { Component, OnInit, NgZone } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/authService';
//Facebook API Fabian
import { FacebookAuthService } from '../../services/facebook-auth.service';
//Facebook API Fabian
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logincomponent',
  imports: [FormsModule, MatIconModule],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css',
})
//Facebook API Fabian
export class Logincomponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    //Facebook API Fabian
    private facebookAuthService: FacebookAuthService,
    private ngZone: NgZone,
    //Facebook API Fabian
  ) {}

  //Facebook API Fabian
  email = '';
  password = '';
  loading = false;
  error = '';

  //Facebook API Fabian
  ngOnInit(): void {
    this.facebookAuthService.initFacebookSDK();
  }
  //Facebook API Fabian

  login() {
    this.loading = true;
    this.error = '';

    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        //Facebook API Fabian
        next: (response: any) => {
          const tokenToSave = response.jwttoken || response.token || response.jwt;
          if (!tokenToSave) {
            console.error('No llegó token del backend', response);
            return;
          }
          localStorage.setItem('token', tokenToSave);
          
          console.log('Login correcto');
          this.router.navigate(['/home']);
        },
        //Facebook API Fabian
        error: (err: HttpErrorResponse) => {
          // this.error = err.status === 401 ? 'Correo o contraseña incorrectos' : 'Error inesperado';
          if (err.status === 401) {
            this.snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          } else {
            this.snackBar.open('Ocurrió un error al iniciar sesión', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  //Facebook API Fabian
  loginConFacebook() {
    this.facebookAuthService
      .loginWithFacebook()
      .then((facebookToken: string) => {
        console.log('Token de Facebook obtenido, enviando al backend...');

        this.authService.loginConFacebookBackend(facebookToken).subscribe({
          next: (response: any) => {
            console.log('Respuesta del backend:', response);

            const tokenToSave = response.jwttoken;

            if (tokenToSave) {
              localStorage.setItem('token', tokenToSave);
              console.log('Token guardado exitosamente:', tokenToSave);

              this.ngZone.run(() => {
                this.router.navigate(['/home']);
              });
            } else {
              this.error = 'Error: El servidor no devolvió un token válido.';
            }
          },
          error: (err) => {
            console.error('Error al validar token en el backend:', err);
            this.error = 'Error de autenticación con el servidor';
          },
        });
      })
      .catch((error) => {
        console.error('Error en la ventana de Facebook:', error);
        this.error = 'No se pudo iniciar sesión con Facebook';
      });
  }
  //Facebook API Fabian
}
