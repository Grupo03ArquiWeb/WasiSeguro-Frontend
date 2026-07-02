import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { TipoIncidente } from '../models/tipo-incidente.model';

@Injectable({
  providedIn: 'root'
})
export class TipoIncidenteService {
  private url = 'http://localhost:8080/api/tipoIncidente';
  private listaCambio = new BehaviorSubject<TipoIncidente[]>([]);

  constructor(private http: HttpClient) {}

  list(): Observable<TipoIncidente[]> {
    return this.http.get<TipoIncidente[]>(`${this.url}/listar`);
  }

  insert(ti: TipoIncidente): Observable<any> {
    return this.http.post(`${this.url}/registrar`, ti);
  }

  update(ti: any): Observable<any> {
    return this.http.put('http://localhost:8080/api/tipoIncidente/actualizar', ti, { responseType: 'text' as 'json' });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }

  listId(id: number): Observable<TipoIncidente> {
    return this.http.get<TipoIncidente>(`${this.url}/${id}`);
  }

  setList(listaNueva: TipoIncidente[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}