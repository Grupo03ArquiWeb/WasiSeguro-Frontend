import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidenteService {
  private baseUrl = 'http://localhost:8080/api/incidentes';

  constructor(private http: HttpClient) { }

  listarIncidentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listar`);
  }
}