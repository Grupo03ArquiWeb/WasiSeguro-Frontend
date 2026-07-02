import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { TipoIncidenteService } from '../../../services/tipo-incidenteservice'; 
import { TipoIncidente } from '../../../models/tipo-incidente.model';

@Component({
  selector: 'app-tipo-incidente-crear',
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
    MatIconModule
  ],
  templateUrl: './tipo-incidente-crear.html',
  styleUrls: ['./tipo-incidente-crear.css']
})
export class TipoIncidenteCrear {
  form: FormGroup;

  estados: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Activo' },
    { value: false, viewValue: 'Inactivo' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tiService: TipoIncidenteService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: [true, Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Por favor, llena todos los campos obligatorios', 'Cerrar', { duration: 3000 });
      return;
    }

    const ti: any = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      activo: this.form.value.estado === true || this.form.value.estado === 'true',
      iconoUrl: ''
    };

    this.tiService.insert(ti).subscribe({
      next: () => {
        this.tiService.list().subscribe((data: TipoIncidente[]) => {
          this.tiService.setList(data);
          this.router.navigate(['/tipos-incidente/listar']);
        });
        this.snackBar.open('Tipo de incidente registrado con éxito', 'Cerrar', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Error al registrar', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/tipos-incidente/listar']);
  }
}