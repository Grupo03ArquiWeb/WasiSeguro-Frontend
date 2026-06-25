import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { PlanSuscripcionservice } from '../../../services/planSuscripcionservice';
import { PlanSuscripcion } from '../../../models/planSuscripcion';

@Component({
  selector: 'app-plansuscripcion-actualizar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
  ],
  templateUrl: './plansuscripcion-actualizar.html',
  styleUrl: './plansuscripcion-actualizar.css',
})
export class PlansuscripcionActualizar implements OnInit {
  form: FormGroup;
  id: number = 0;

  estados: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Activo' },
    { value: false, viewValue: 'Inactivo' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pS: PlanSuscripcionservice,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.maxLength(255)]],
      beneficios: ['', [Validators.maxLength(500)]],
      precioMensual: ['', [Validators.required, Validators.min(0)]],
      precioAnual: ['', [Validators.required, Validators.min(0)]],
      activo: [true, Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    if (!this.id || isNaN(this.id)) {
      this.snackBar.open('ID inválido para actualizar', 'Cerrar', {
        duration: 3000,
      });
      this.router.navigate(['/plansuscripcion/listar']);
      return;
    }

    this.pS.listId(this.id).subscribe({
      next: (data) => {
        this.form.patchValue({
          nombre: data.nombre,
          descripcion: data.descripcion,
          beneficios: data.beneficios,
          precioMensual: data.precioMensual,
          precioAnual: data.precioAnual,
          activo: data.activo,
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar el plan:', err);
        this.snackBar.open('Error al cargar el plan', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/plansuscripcion/listar']);
      },
    });
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const modelo: PlanSuscripcion = new PlanSuscripcion();
    modelo.id = this.id;
    modelo.nombre = this.form.value.nombre;
    modelo.descripcion = this.form.value.descripcion;
    modelo.beneficios = this.form.value.beneficios;
    modelo.precioMensual = Number(this.form.value.precioMensual);
    modelo.precioAnual = Number(this.form.value.precioAnual);
    modelo.activo = this.form.value.activo;

    this.pS.update(modelo).subscribe({
      next: () => {
        this.snackBar.open('Plan actualizado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/plansuscripcion/listar']);
      },
      error: (err) => {
        console.error('Error al actualizar plan:', err);
        this.snackBar.open('Error al actualizar el plan', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/plansuscripcion/listar']);
  }
}