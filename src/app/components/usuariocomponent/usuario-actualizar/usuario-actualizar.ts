import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Usuario } from '../../../models/usuario';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-usuario-actualizar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatFormFieldModule,
  ],
  templateUrl: './usuario-actualizar.html',
  styleUrl: './usuario-actualizar.css',
})
export class UsuarioActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  id: string = "";
    roles: { value: number; viewValue: string }[] = [
      { value: 1, viewValue: 'ADMIN' },
      { value: 2, viewValue: 'MODERADOR' },
      { value: 3, viewValue: 'USER' },
    ];
  idiomas: { value: string; viewValue: string }[] = [
      { value: "es", viewValue: 'español' },
      { value: "en", viewValue: 'ingles' },
      { value: "fr", viewValue: 'frances' },
    ];

  constructor(
    private userS: Usuarioservice,
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
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
      telefono: ['', [Validators.required, Validators.maxLength(20)]],
      idRol: [1, Validators.required],
      fotoPerfil: ['', [Validators.pattern(/^https?:\/\/.+/)]],
      idioma: [''],
    });
  }
  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.form.valid) {
      this.usuario.id = this.form.value.codigo;
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.apellido = this.form.value.apellido;
      this.usuario.email = this.form.value.email;
      this.usuario.telefono = this.form.value.telefono;
      this.usuario.idRol = this.form.value.idRol;
      this.usuario.fotoPerfil = this.form.value.fotoPerfil;
      this.usuario.idioma = this.form.value.idioma;

      this.userS.update(this.usuario).subscribe({
        next: () => {
          this.router.navigate(['/usuario/listar']);
        },
      });
    }
  }
  init() {
    this.userS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.id,
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        telefono: data.telefono,
        idRol: data.idRol,
        fotoPerfil: data.fotoPerfil,
        idioma: data.idioma,
      });
    });
  }
}
