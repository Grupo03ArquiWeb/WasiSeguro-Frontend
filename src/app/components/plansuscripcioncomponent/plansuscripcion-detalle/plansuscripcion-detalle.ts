import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PlanSuscripcion } from '../../../models/planSuscripcion';
import { PlanSuscripcionservice } from '../../../services/planSuscripcionservice';

@Component({
  selector: 'app-plansuscripcion-detalle',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './plansuscripcion-detalle.html',
  styleUrl: './plansuscripcion-detalle.css',
})
export class PlansuscripcionDetalle implements OnInit {
  planSuscripcion: PlanSuscripcion | null = null;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pS: PlanSuscripcionservice,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    if (!this.id || isNaN(this.id)) {
      this.snackBar.open('ID inválido para detalle', 'Cerrar', {
        duration: 3000,
      });
      this.router.navigate(['/plansuscripcion/listar']);
      return;
    }

    this.pS.listId(this.id).subscribe({
      next: (data) => {
        this.planSuscripcion = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener detalle del plan:', err);
        this.snackBar.open('Error al cargar el detalle del plan', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/plansuscripcion/listar']);
      },
    });
  }

  volver(): void {
    this.router.navigate(['/plansuscripcion/listar']);
  }
}