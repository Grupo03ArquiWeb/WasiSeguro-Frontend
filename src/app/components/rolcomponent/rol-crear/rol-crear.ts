import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Rol } from '../../../models/Rol';
import { Rolservice } from '../../../services/rolservice';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rol-crear',
  imports: [    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule, MatIconModule, RouterLink],
      providers: [provideNativeDateAdapter()],
  templateUrl: './rol-crear.html',
  styleUrl: './rol-crear.css',
})
export class RolCrear implements OnInit {
 form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();
  tipos: { value: string; viewValue: string }[] = [
    { value: 'ADMIN', viewValue: 'ADMIN' },
    { value: 'MODERADOR', viewValue: 'MODERADOR' },
    { value: 'USER', viewValue: 'USER' },
  ];

  constructor(
    private rS: Rolservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', Validators.required],
      activo: [false, Validators.required],
    });
  }
  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.form.valid) {
      this.rol.nombre = this.form.value.nombre;
      this.rol.descripcion = this.form.value.descripcion;
      this.rol.activo = this.form.value.activo;
      this.rS.insert(this.rol).subscribe({
        next: () => {
          this.router.navigate(['/roles/listar']);
        },
      });
    }
  }
}
