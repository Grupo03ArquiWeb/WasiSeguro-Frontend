import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Rol } from '../../../models/Rol';
import { Rolservice } from '../../../services/rolservice';

@Component({
  selector: 'app-rol-actualizar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './rol-actualizar.html',
  styleUrl: './rol-actualizar.css',
})
export class RolActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();
  id: number = 0;
  constructor(
    private rS: Rolservice,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      //cargar datos
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      descripcion: ['', [Validators.required, Validators.maxLength(50)]],
      activo: [false, Validators.required],
    });
  }
  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.form.valid) {
      this.rol.id = this.form.value.codigo;
      this.rol.nombre = this.form.value.nombre;
      this.rol.descripcion = this.form.value.descripcion;
      this.rol.activo = this.form.value.activo;

      this.rS.update(this.rol).subscribe({
        next: () => {
          this.router.navigate(['/roles/listar']);
        },
      });
    }
  }
  init() {
    this.rS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        id: data.id,
        nombre: data.nombre,
        descripcion: data.descripcion,
        activo: data.activo,
      });
    });
  }
}
