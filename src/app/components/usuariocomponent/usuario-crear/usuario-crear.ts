import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Usuarioservice } from '../../../services/usuarioservice';
import { UsuarioCreate } from '../../../models/usuarioCreateDTO';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-usuario-crear',
  imports: [
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink,
    MatFormFieldModule,
  ],
  templateUrl: './usuario-crear.html',
  styleUrl: './usuario-crear.css',
})
export class UsuarioCrear implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: UsuarioCreate = new UsuarioCreate();
  roles: { value: number; viewValue: string }[] = [
    { value: 1, viewValue: 'ADMIN' },
    { value: 2, viewValue: 'MODERADOR' },
    { value: 3, viewValue: 'USER' },
  ];

  constructor(
    private userS: Usuarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
      telefono: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required]],
      idRol: [1, Validators.required],
    });
  }
  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.form.valid) {
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.apellido = this.form.value.apellido;
      this.usuario.email = this.form.value.email;
      this.usuario.telefono = this.form.value.telefono;
      this.usuario.password = this.form.value.password;
      this.usuario.idRol = this.form.value.idRol;
      this.userS.insert(this.usuario).subscribe({
        next: () => {
          this.router.navigate(['/usuario/listar']);
        },
      });
    }
  }
}
