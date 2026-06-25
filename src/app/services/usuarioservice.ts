import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from './baseUrl';
import { Usuario } from '../models/usuario';
import { UsuarioCreate } from '../models/usuarioCreateDTO';

@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {
  private url = `${baseUrl}/api/usuario`;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuario[]>(`${this.url}/listar`);
  }
  insert(m: UsuarioCreate) {
    return this.http.post<Usuario>(`${this.url}/crear`, m);
  }
  listId(id: string) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }
  update(u: Usuario) {
    return this.http.put(`${this.url}/actualizar/${u.id}`, u, { responseType: 'text' });
  }
  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
