import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
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

  fechaInicioFiltro: Date | null = null;
  fechaFinFiltro: Date | null = null;
  estadoSeleccionado: string = '';

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
        this.faAplicarFiltroEstado();
      },
      error: (err) => {
        console.error('Error al listar suscripciones:', err);
        this.snackBar.open('Error al cargar suscripciones', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  faCapturarFechaInicio(event: any): void {
    this.fechaInicioFiltro = event.value;
  }

  faCapturarFechaFin(event: any): void {
    this.fechaFinFiltro = event.value;
  }

  faFormatearFecha(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }

  faFiltrarEstado(valor: string): void {
    this.estadoSeleccionado = valor;
    this.faAplicarFiltroEstado();
  }

  faAplicarFiltroEstado(): void {
    this.faDataSource.filter = this.estadoSeleccionado.trim().toLowerCase();

    if (this.faDataSource.paginator) {
      this.faDataSource.paginator.firstPage();
    }
  }

  faFiltrarPorFechas(): void {
    if (!this.fechaInicioFiltro || !this.fechaFinFiltro) {
      this.snackBar.open('Debe seleccionar ambas fechas para filtrar', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (this.fechaInicioFiltro > this.fechaFinFiltro) {
      this.snackBar.open(
        'La fecha de inicio no puede ser mayor que la fecha fin',
        'Cerrar',
        {
          duration: 3000,
        }
      );
      return;
    }

    const fechaInicio = this.faFormatearFecha(this.fechaInicioFiltro);
    const fechaFin = this.faFormatearFecha(this.fechaFinFiltro);

    this.sS.filtrarPorFechas(fechaInicio, fechaFin).subscribe({
      next: (data) => {
        this.faDataSource.data = data;
        this.faDataSource.paginator = this.faPaginator;
        this.faAplicarFiltroEstado();

        if (data.length === 0) {
          this.snackBar.open('No se encontraron suscripciones en ese rango', 'Cerrar', {
            duration: 3000,
          });
        }
      },
      error: (err) => {
        console.error('Error al filtrar por fechas:', err);
        this.snackBar.open('Error al filtrar suscripciones por fechas', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  faLimpiarFiltrosFechas(): void {
    this.fechaInicioFiltro = null;
    this.fechaFinFiltro = null;
    this.faCargarDatos();
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