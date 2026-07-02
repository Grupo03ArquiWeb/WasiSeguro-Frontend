import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { TipoIncidenteService } from '../../../services/tipo-incidenteservice';

@Component({
  selector: 'app-tipo-incidente-actualizar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatSelectModule],
  templateUrl: './tipo-incidente-actualizar.html'
})
export class TipoIncidenteActualizar implements OnInit {
  form: FormGroup;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tiService: TipoIncidenteService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      activo: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = Number(data['id']);
      this.tiService.listId(this.id).subscribe(data => {
        this.form.patchValue({
          nombre: data.nombre,
          descripcion: data.descripcion,
          activo: data.activo
        });
      });
    });
  }

  actualizar(): void {
    if (this.form.invalid) return;

    const ti = {
      id: this.id,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      activo: this.form.value.activo,
      iconoUrl: ''
    };

    this.tiService.update(ti).subscribe(() => {
      this.tiService.list().subscribe(data => this.tiService.setList(data));
      this.snackBar.open('Actualizado correctamente', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/tipos-incidente/listar']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/tipos-incidente/listar']);
  }
}