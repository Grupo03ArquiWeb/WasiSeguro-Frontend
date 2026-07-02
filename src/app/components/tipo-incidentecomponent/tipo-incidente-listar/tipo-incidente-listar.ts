import { Component, OnInit } from '@angular/core';
import { TipoIncidente } from '../../../models/tipo-incidente.model';
import { TipoIncidenteService } from '../../../services/tipo-incidenteservice';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tipo-incidente-listar',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule],
  templateUrl: './tipo-incidente-listar.html',
  styleUrls: ['./tipo-incidente-listar.css']
})
export class TipoIncidenteListar implements OnInit {
  lista: TipoIncidente[] = [];

  constructor(private tiService: TipoIncidenteService) {}

  ngOnInit(): void {
    this.tiService.getList().subscribe(data => {
      this.lista = data.sort((a, b) => a.id - b.id);
    });

    this.cargarDatos();
  }

  cargarDatos(): void {
    this.tiService.list().subscribe(data => {
      this.tiService.setList(data);
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este tipo de incidente?')) {
      this.lista = this.lista.filter(x => x.id !== id);
      
      this.tiService.delete(id).subscribe(() => {

        this.cargarDatos();
      });
    }
  }
}