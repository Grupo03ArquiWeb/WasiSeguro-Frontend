import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Suscripcion } from '../models/suscripcion';
import { SuscripcionCreateDTO } from '../models/suscripcionCreateDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Suscripcionservice {
  private url = `${base_url}/api/suscripciones`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Suscripcion[]>(`${this.url}/listar`);
  }

  insert(s: SuscripcionCreateDTO) {
    return this.http.post(`${this.url}/registrar`, s);
  }

  update(id: number, s: SuscripcionCreateDTO) {
    return this.http.put(`${this.url}/actualizar/${id}`, s, {
      responseType: 'text',
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`, {
      responseType: 'text',
    });
  }

  filtrarPorEstado(estado: string) {
    return this.http.get<Suscripcion[]>(`${this.url}/filtrar/estado/${estado}`);
  }

  filtrarPorFechas(fechaInicio: string, fechaFin: string) {
    return this.http.get<Suscripcion[]>(
      `${this.url}/filtrar/fechas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
    );
  }
}