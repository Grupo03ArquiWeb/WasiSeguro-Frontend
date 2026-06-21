import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { Suscripcion } from '../../../models/suscripcion';
import { Suscripcionservice } from '../../../services/suscripcionservice';

@Component({
  selector: 'app-suscripcion-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule,
  ],
  templateUrl: './suscripcion-list.html',
  styleUrl: './suscripcion-list.css',
})
export class SuscripcionList implements OnInit {
  faDataSource: MatTableDataSource<Suscripcion> = new MatTableDataSource();

  faDisplayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  @ViewChild(MatPaginator) faPaginator!: MatPaginator;

  constructor(
    private sS: Suscripcionservice,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.faCargarDatos();

    this.faDataSource.filterPredicate = (data: Suscripcion, filter: string) => {
      const estado = data.estado ? data.estado.toLowerCase() : '';
      return estado.includes(filter);
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

  faFiltrar(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.faDataSource.filter = filterValue.trim().toLowerCase();

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