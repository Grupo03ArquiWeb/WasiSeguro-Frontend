import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { Suscripcionservice } from '../../../services/suscripcionservice';
import { SuscripcionCreateDTO } from '../../../models/suscripcionCreateDTO';

@Component({
  selector: 'app-suscripcion-actualizar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  templateUrl: './suscripcion-actualizar.html',
  styleUrl: './suscripcion-actualizar.css',
})
export class SuscripcionActualizar implements OnInit {
  form: FormGroup;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sS: Suscripcionservice,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      idUsuario: ['', Validators.required],
      idPlan: [0, [Validators.required, Validators.min(1)]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    if (!this.id || isNaN(this.id)) {
      this.snackBar.open('ID inválido para actualizar', 'Cerrar', {
        duration: 3000,
      });
      this.router.navigate(['/suscripcion/listar']);
      return;
    }

    this.sS.listId(this.id).subscribe({
      next: (data) => {
        this.form.patchValue({
          idUsuario: data.idUsuario,
          idPlan: data.idPlan,
          fechaInicio: data.fechaInicio,
          fechaFin: data.fechaFin,
          estado: data.estado,
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar la suscripción:', err);
        this.snackBar.open('Error al cargar la suscripción', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/suscripcion/listar']);
      },
    });
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const modelo: SuscripcionCreateDTO = new SuscripcionCreateDTO();
    modelo.idUsuario = this.form.value.idUsuario;
    modelo.idPlan = Number(this.form.value.idPlan);
    modelo.fechaInicio = this.form.value.fechaInicio;
    modelo.fechaFin = this.form.value.fechaFin;
    modelo.estado = this.form.value.estado;

    this.sS.update(this.id, modelo).subscribe({
      next: () => {
        this.snackBar.open('Suscripción actualizada correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/suscripcion/listar']);
      },
      error: (err) => {
        console.error('Error al actualizar suscripción:', err);
        this.snackBar.open('ID Plan de suscripcion no encontrado', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/suscripcion/listar']);
  }
}