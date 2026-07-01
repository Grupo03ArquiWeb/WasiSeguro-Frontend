import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from './baseUrl';
import { LoginRequest } from '../models/login-request';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${baseUrl}/login`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
  login(request: LoginRequest) {
    return this.http.post(this.url, request);
  }
  verificar(): boolean {
    if (!this.isBrowser()) {
      return false;
    }
    const token = localStorage.getItem('token');
    return token != null;
  }

  showRole(): string | null {
    if (!this.isBrowser()) {
      return null;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken.roles;
  }
  logout() {
    localStorage.removeItem('token');
  }

  //facebook api
  loginConFacebookBackend(token: string) {
    // Escribimos la URL base directamente para evitar que se mezcle con /login
    return this.http.post<any>('http://localhost:8080/facebook', { token: token });
  }
}
