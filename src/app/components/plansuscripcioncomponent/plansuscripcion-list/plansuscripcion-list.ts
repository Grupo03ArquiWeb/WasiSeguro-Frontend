import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

import { PlanSuscripcion } from '../../../models/planSuscripcion';
import { PlanSuscripcionservice } from '../../../services/planSuscripcionservice';
import { AuthService } from '../../../services/authService';

@Component({
  selector: 'app-plansuscripcion-list',
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
  templateUrl: './plansuscripcion-list.html',
  styleUrl: './plansuscripcion-list.css',
})
export class PlansuscripcionList implements OnInit {
  dataSource: MatTableDataSource<PlanSuscripcion> = new MatTableDataSource();

  displayedColumns: string[] = [
    'id',
    'nombre',
    'precioMensual',
    'precioAnual',
    'activo',
    'acciones',
  ];

  estadosFiltro: { value: string; viewValue: string }[] = [
    { value: '', viewValue: 'Todos' },
    { value: 'true', viewValue: 'Activo' },
    { value: 'false', viewValue: 'Inactivo' },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pS: PlanSuscripcionservice,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();

    this.dataSource.filterPredicate = (data: PlanSuscripcion, filter: string) => {
      if (filter === '') return true;
      return String(data.activo) === filter;
    };
  }

  isAdmin(): boolean {
    return this.authService.showRole() === 'ROLE_ADMIN';
  }

  cargarDatos(): void {
    this.pS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error al listar planes:', err);
        this.snackBar.open('Error al cargar planes', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  filtrarEstado(valor: string): void {
    this.dataSource.filter = valor;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(id: number): void {
    if (!this.isAdmin()) {
      this.snackBar.open('No tiene permisos para eliminar', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    const confirmacion = confirm('¿Está seguro de eliminar este plan?');

    if (!confirmacion) {
      return;
    }

    this.pS.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Se eliminó correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.cargarDatos();
      },
      error: (err) => {
        console.error('Error al eliminar plan:', err);
        this.snackBar.open('Error al eliminar el plan', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}