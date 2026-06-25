import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

import { Suscripcion } from '../../../models/suscripcion';
import { Suscripcionservice } from '../../../services/suscripcionservice';

@Component({
  selector: 'app-suscripcion-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule,
    MatSelectModule,
  ],
  templateUrl: './suscripcion-list.html',
  styleUrl: './suscripcion-list.css',
})
export class SuscripcionList implements OnInit {
  faDataSource: MatTableDataSource<Suscripcion> = new MatTableDataSource();
  faDisplayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  estadosFiltro: { value: string; viewValue: string }[] = [
    { value: '', viewValue: 'Todos' },
    { value: 'activo', viewValue: 'Activo' },
    { value: 'inactivo', viewValue: 'Inactivo' },
  ];

  @ViewChild(MatPaginator) faPaginator!: MatPaginator;

  constructor(
    private sS: Suscripcionservice,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.faCargarDatos();

    this.faDataSource.filterPredicate = (data: Suscripcion, filter: string) => {
      const estado = data.estado ? data.estado.toLowerCase() : '';
      return filter === '' ? true : estado === filter;
    };
  }

  faCargarDatos(): void {
    this.sS.list().subscribe({
      next: (data) => {
        this.faDataSource.data = data;
        this.faDataSource.paginator = this.faPaginator;
      },
      error: (err) => {
        console.error('Error al listar suscripciones:', err);
        this.snackBar.open('Error al cargar suscripciones', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  faFiltrarEstado(valor: string): void {
    this.faDataSource.filter = valor.trim().toLowerCase();

    if (this.faDataSource.paginator) {
      this.faDataSource.paginator.firstPage();
    }
  }

  faEliminar(id: number): void {
    const confirmacion = confirm('¿Está seguro de eliminar esta suscripción?');

    if (!confirmacion) {
      return;
    }

    this.sS.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Se eliminó correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.faCargarDatos();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        this.snackBar.open('Error al eliminar la suscripción', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}