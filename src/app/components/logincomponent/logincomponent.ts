
import { Component, OnInit, NgZone } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/authService';
//Facebook API Fabian
import { FacebookAuthService } from '../../services/facebook-auth.service';
//Facebook API Fabian
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-logincomponent',
  imports: [FormsModule, MatIconModule],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css',
})
//Facebook API Fabian
export class Logincomponent implements OnInit {
//Facebook API Fabian
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    //Facebook API Fabian
    private facebookAuthService: FacebookAuthService,
    private ngZone: NgZone
    //Facebook API Fabian
  ) {}

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
          console.log('Login correcto');
          // Añadimos jwttoken aquí también por seguridad para que coincida con el backend
          const tokenToSave = response.jwttoken || response.token || response.jwt;
          if (tokenToSave) {
            localStorage.setItem('token', tokenToSave);
          }
          this.router.navigate(['/home']);
        },
        //Facebook API Fabian
        error: (err: HttpErrorResponse) => {
          this.error = err.status === 401 ? 'Correo o contraseña incorrectos' : 'Error inesperado';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  //Facebook API Fabian
  loginConFacebook() {
    this.facebookAuthService.loginWithFacebook()
      .then((facebookToken: string) => {
        console.log('Token de Facebook obtenido, enviando al backend...');
        
        this.authService.loginConFacebookBackend(facebookToken).subscribe({
          next: (response: any) => {
            console.log('Respuesta del backend:', response);
            
            // CAMBIO APLICADO: Ahora buscamos exactamente 'jwttoken' como lo envía tu Java
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
          }
        });
      })
      .catch((error) => {
        console.error('Error en la ventana de Facebook:', error);
        this.error = 'No se pudo iniciar sesión con Facebook';
      });
  }
  //Facebook API Fabian
}