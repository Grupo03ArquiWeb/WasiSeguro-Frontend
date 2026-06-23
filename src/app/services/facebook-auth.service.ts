import { Injectable } from '@angular/core';

// Declaramos FB globalmente para que TypeScript lo reconozca y no marque error
declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthService {

  constructor() { }

  // 1. Inicializar el SDK
  initFacebookSDK() {
    if ((window as any).FB) {
      FB.init({
        appId      : '1346877704052387', // El identificador de tu app WasiSeguro
        cookie     : true,               // Permite que el servidor acceda a la sesión
        xfbml      : true,               // Analiza plugins sociales
        version    : 'v18.0'             // Versión de la Graph API
      });
      console.log('Facebook SDK inicializado correctamente');
    } else {
      console.error('El SDK de Facebook aún no ha cargado en el index.html');
    }
  }

  // 2. Método para abrir la ventana de Login (Actualizado con Promesa)
  loginWithFacebook(): Promise<string> {
    return new Promise((resolve, reject) => {
      FB.login((response: any) => {
        if (response.authResponse) {
          console.log('¡Inicio de sesión exitoso con Facebook!');
          const accessToken = response.authResponse.accessToken; 
          resolve(accessToken); // Devolvemos el token al componente
        } else {
          console.log('El usuario canceló el inicio de sesión.');
          reject('Cancelado');
        }
      }, { scope: 'public_profile,email' }); // Permisos que le pedimos al usuario
    });
  }
}