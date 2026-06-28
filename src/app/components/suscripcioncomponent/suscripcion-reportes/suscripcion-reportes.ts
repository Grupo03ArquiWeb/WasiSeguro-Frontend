import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';

import { Suscripcionservice } from '../../../services/suscripcionservice';

@Component({
  selector: 'app-suscripcion-reportes',
  standalone: true,
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './suscripcion-reportes.html',
  styleUrl: './suscripcion-reportes.css',
})
export class SuscripcionReportes implements OnInit {
  @ViewChild('chartEstado') chartEstado?: BaseChartDirective;
  @ViewChild('chartPlan') chartPlan?: BaseChartDirective;

  hasDataEstado = false;
  hasDataPlan = false;

  barChartOptionsEstado: ChartOptions = {
    responsive: true,
  };

  barChartOptionsPlan: ChartOptions = {
    responsive: true,
  };

  barChartLegendEstado = true;
  barChartLegendPlan = true;

  barChartLabelsEstado: string[] = [];
  barChartLabelsPlan: string[] = [];

  barChartDataEstado: ChartDataset[] = [];
  barChartDataPlan: ChartDataset[] = [];
//Reporte suscripciones por estado
  barChartTypeEstado: ChartType = 'pie';
//Reporte de suscripciones por plan
  barChartTypePlan: ChartType = 'bar';

  constructor(private sS: Suscripcionservice) {}

  ngOnInit(): void {
    this.cargarReporteEstado();
    this.cargarReportePlan();
  }

  cargarReporteEstado(): void {
    this.sS.estadisticasPorEstado().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.hasDataEstado = true;
          this.barChartLabelsEstado = data.map((item) => item.estado);
          this.barChartDataEstado = [
            {
              data: data.map((item) => item.cantidadSuscripciones),
              label: 'Cantidad de suscripciones por estado',
              backgroundColor: [
                '#045fd7f5',
                '#f40b03e0',
                'rgb(194, 41, 31)',
                'rgba(230, 77, 77, 0.5)',
                'rgb(148, 14, 4)',
              ],
            },
          ];

          setTimeout(() => {
            this.chartEstado?.update();
          }, 0);
        } else {
          this.hasDataEstado = false;
        }
      },
      error: (err) => {
        console.error('Error al cargar estadísticas por estado:', err);
        this.hasDataEstado = false;
      },
    });
  }

  cargarReportePlan(): void {
    this.sS.estadisticasPorPlan().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.hasDataPlan = true;
          this.barChartLabelsPlan = data.map((item) => item.nombrePlan);
          this.barChartDataPlan = [
            {
              data: data.map((item) => item.cantidadSuscripciones),
              label: 'Cantidad de suscripciones por plan',
              backgroundColor: [
                '#d79404a6',
                '#c8f403e0',
                'rgb(31, 194, 31)',
                'rgba(80, 77, 230, 0.5)',
                'rgb(6, 4, 148)',
              ],
              borderColor: [
                '#b71c1c',
                '#c62828',
                '#8e0000',
                '#ef5350',
                '#7f0000',
              ],
              borderWidth: 1,
            },
          ];

          setTimeout(() => {
            this.chartPlan?.update();
          }, 0);
        } else {
          this.hasDataPlan = false;
        }
      },
      error: (err) => {
        console.error('Error al cargar estadísticas por plan:', err);
        this.hasDataPlan = false;
      },
    });
  }
}