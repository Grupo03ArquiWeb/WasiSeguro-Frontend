import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanSuscripcion } from '../models/planSuscripcion';
import { baseUrl } from './baseUrl';

@Injectable({
  providedIn: 'root',
})
export class PlanSuscripcionservice {
  private url = `${baseUrl}/api/planSuscripcion`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<PlanSuscripcion[]>(`${this.url}/listar`);
  }

  insert(p: PlanSuscripcion) {
    return this.http.post(`${this.url}/registrar`, p);
  }

  listId(id: number) {
    return this.http.get<PlanSuscripcion>(`${this.url}/${id}`);
  }

  update(p: PlanSuscripcion) {
    return this.http.put(`${this.url}/actualizar`, p);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`, {
      responseType: 'text',
    });
  }
}