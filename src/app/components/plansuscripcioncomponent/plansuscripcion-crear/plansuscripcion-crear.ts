import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { PlanSuscripcionservice } from '../../../services/planSuscripcionservice';
import { PlanSuscripcion } from '../../../models/planSuscripcion';

@Component({
  selector: 'app-plansuscripcion-crear',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  templateUrl: './plansuscripcion-crear.html',
  styleUrl: './plansuscripcion-crear.css',
})
export class PlansuscripcionCrear implements OnInit {
  form: FormGroup = new FormGroup({});
  pModelo: PlanSuscripcion = new PlanSuscripcion();

  estados: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Activo' },
    { value: false, viewValue: 'Inactivo' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private pS: PlanSuscripcionservice,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      beneficios: ['', [Validators.required, Validators.maxLength(500)]],
      precioMensual: ['', [Validators.required, Validators.min(0)]],
      precioAnual: ['', [Validators.required, Validators.min(0)]],
      activo: [null, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.pModelo.nombre = this.form.value.nombre;
    this.pModelo.descripcion = this.form.value.descripcion;
    this.pModelo.beneficios = this.form.value.beneficios;
    this.pModelo.precioMensual = Number(this.form.value.precioMensual);
    this.pModelo.precioAnual = Number(this.form.value.precioAnual);
    this.pModelo.activo = this.form.value.activo;

    this.pS.insert(this.pModelo).subscribe({
      next: () => {
        this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/plansuscripcion/listar']);
      },
      error: (err) => {
        console.error('Error al registrar plan:', err);
        this.snackBar.open('Error al registrar el plan', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/plansuscripcion/listar']);
  }
}