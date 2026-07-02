import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../models/Rol';
import { baseUrl } from './baseUrl';
import { RolEstadisticaUsuarios } from '../models/rolEstadisticaUsuarios';

@Injectable({
  providedIn: 'root',
})
export class Rolservice {
  private url = `${baseUrl}/api/rol`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Rol[]>(`${this.url}/listar`);
  }
  insert(m: Rol) {
    return this.http.post<Rol>(`${this.url}/crear`, m);
  }
  listId(id: number) {
    return this.http.get<Rol>(`${this.url}/${id}`);
  }
  update(m: Rol) {
    return this.http.put(`${this.url}/actualizar/${m.id}`, m, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  estadisticasPorRol() {
  return this.http.get<RolEstadisticaUsuarios[]>(`${this.url}/usuariosporol`);
}
}
