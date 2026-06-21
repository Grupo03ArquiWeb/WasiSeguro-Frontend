import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Suscripcion } from '../../../models/suscripcion';
import { Suscripcionservice } from '../../../services/suscripcionservice';

@Component({
  selector: 'app-suscripcion-detalle',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './suscripcion-detalle.html',
  styleUrl: './suscripcion-detalle.css',
})
export class SuscripcionDetalle implements OnInit {
  suscripcion: Suscripcion | null = null;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sS: Suscripcionservice,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    if (!this.id || isNaN(this.id)) {
      this.snackBar.open('ID inválido para detalle', 'Cerrar', {
        duration: 3000,
      });
      this.router.navigate(['/suscripcion/listar']);
      return;
    }

    this.sS.listId(this.id).subscribe({
      next: (data) => {
        this.suscripcion = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener detalle:', err);
        this.snackBar.open('Error al cargar el detalle de la suscripción', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/suscripcion/listar']);
      },
    });
  }

  volver(): void {
    this.router.navigate(['/suscripcion/listar']);
  }
}