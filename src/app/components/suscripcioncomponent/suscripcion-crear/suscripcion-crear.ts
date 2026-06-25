import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

import { Suscripcionservice } from '../../../services/suscripcionservice';
import { SuscripcionCreateDTO } from '../../../models/suscripcionCreateDTO';
import { PlanSuscripcion } from '../../../models/planSuscripcion';
import { PlanSuscripcionservice } from '../../../services/planSuscripcionservice';

@Component({
  selector: 'app-suscripcion-crear',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  templateUrl: './suscripcion-crear.html',
  styleUrl: './suscripcion-crear.css',
})
export class SuscripcionCrear implements OnInit {
  form: FormGroup = new FormGroup({});
  sModelo: SuscripcionCreateDTO = new SuscripcionCreateDTO();
  minDate: Date = new Date();
  listaPlanes: PlanSuscripcion[] = [];

  estados: { value: string; viewValue: string }[] = [
    { value: 'activo', viewValue: 'Activo' },
    { value: 'inactivo', viewValue: 'Inactivo' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private sS: Suscripcionservice,
    private pS: PlanSuscripcionservice,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pS.list().subscribe({
      next: (data) => {
        this.listaPlanes = data;
      },
      error: (err) => {
        console.error('Error al cargar planes:', err);
        this.snackBar.open('Error al cargar los planes', 'Cerrar', {
          duration: 3000,
        });
      },
    });

    this.form = this.formBuilder.group(
      {
        idUsuario: ['', [Validators.required]],
        idPlan: ['', [Validators.required]],
        fechaInicio: ['', Validators.required],
        fechaFin: ['', Validators.required],
        estado: ['', [Validators.required, Validators.maxLength(30)]],
      },
      { validators: this.fechasValidator }
    );
  }

  fechasValidator(control: AbstractControl) {
    const valorFechaInicio = control.get('fechaInicio')?.value;
    const valorFechaFin = control.get('fechaFin')?.value;

    if (!valorFechaInicio || !valorFechaFin) return null;

    const fechaInicio = new Date(valorFechaInicio);
    const fechaFin = new Date(valorFechaFin);

    return fechaFin >= fechaInicio ? null : { fechaInvalida: true };
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sModelo.idUsuario = this.form.value.idUsuario;
    this.sModelo.idPlan = Number(this.form.value.idPlan);
    this.sModelo.estado = this.form.value.estado;

    const fechaInicioOriginal = this.form.value.fechaInicio;
    if (fechaInicioOriginal instanceof Date) {
      const anio = fechaInicioOriginal.getFullYear();
      const mes = (fechaInicioOriginal.getMonth() + 1).toString().padStart(2, '0');
      const dia = fechaInicioOriginal.getDate().toString().padStart(2, '0');
      this.sModelo.fechaInicio = `${anio}-${mes}-${dia}`;
    } else {
      this.sModelo.fechaInicio = fechaInicioOriginal;
    }

    const fechaFinOriginal = this.form.value.fechaFin;
    if (fechaFinOriginal instanceof Date) {
      const anio = fechaFinOriginal.getFullYear();
      const mes = (fechaFinOriginal.getMonth() + 1).toString().padStart(2, '0');
      const dia = fechaFinOriginal.getDate().toString().padStart(2, '0');
      this.sModelo.fechaFin = `${anio}-${mes}-${dia}`;
    } else {
      this.sModelo.fechaFin = fechaFinOriginal;
    }

    this.sS.insert(this.sModelo).subscribe({
      next: () => {
        this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/suscripcion/listar']);
      },
      error: (err) => {
        console.error('Error al registrar suscripción:', err);
        this.snackBar.open('Error al registrar, revisa la consola', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/suscripcion/listar']);
  }
}