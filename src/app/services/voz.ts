import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';

export interface VozResponse {
  comandoDetectado: string;
  mensaje: string;
  accion: string;
}

@Injectable({
  providedIn: 'root'
})
export class VozService {

  private apiUrl = 'http://localhost:8083/api/voz/comando';

  // Temporalmente usamos mock porque el backend todavía no levanta.
  private usarMock = true;

  constructor(private http: HttpClient) { }

  procesarComando(texto: string): Observable<VozResponse> {
    if (this.usarMock) {
      return this.procesarComandoMock(texto);
    }

    return this.http.post<VozResponse>(this.apiUrl, {
      texto: texto
    });
  }

  private procesarComandoMock(texto: string): Observable<VozResponse> {
    const comando = texto.toLowerCase();

    if (comando.includes('ruta segura') || comando.includes('rutas seguras')) {
      return of({
        comandoDetectado: 'RUTA_SEGURA',
        mensaje: 'Se buscará la ruta más segura disponible.',
        accion: '/api/ruta/sugerir-rutas-seguras'
      }).pipe(delay(500));
    }

    if (comando.includes('alerta')) {
      return of({
        comandoDetectado: 'ACTIVAR_ALERTA',
        mensaje: 'Se activará la opción de alerta.',
        accion: '/api/alerta'
      }).pipe(delay(500));
    }

    if (comando.includes('compartir ubicación') || comando.includes('compartir ubicacion')) {
      return of({
        comandoDetectado: 'COMPARTIR_UBICACION',
        mensaje: 'Se abrirá la opción para compartir ubicación.',
        accion: '/api/sesion-ubicacion-compartida'
      }).pipe(delay(500));
    }

    if (comando.includes('zonas de riesgo') || comando.includes('zona de riesgo')) {
      return of({
        comandoDetectado: 'ZONAS_RIESGO',
        mensaje: 'Se mostrará la información de zonas de riesgo.',
        accion: '/api/zona-riesgo'
      }).pipe(delay(500));
    }

    if (comando.includes('cancelar')) {
      return of({
        comandoDetectado: 'CANCELAR',
        mensaje: 'Operación cancelada.',
        accion: 'NINGUNA'
      }).pipe(delay(500));
    }

    return of({
      comandoDetectado: 'NO_RECONOCIDO',
      mensaje: 'No se reconoció el comando indicado.',
      accion: 'NINGUNA'
    }).pipe(delay(500));
  }
}