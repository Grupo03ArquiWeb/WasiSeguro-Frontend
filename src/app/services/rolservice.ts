import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../models/Rol';
 import {baseUrl} from './baseUrl';

@Injectable({
  providedIn: 'root',
})
export class Rolservice {
  private url = `${baseUrl}/api/rol`
  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Rol[]>(`${this.url}/listar`)
  }
  insert(m:Rol) {
    return this.http.post(`${this.url}/crear`, m)
  }
  delete(id:number) {
    return this.http.delete(`${this.url}/${id}`, {responseType:"text"})  
  }
}
