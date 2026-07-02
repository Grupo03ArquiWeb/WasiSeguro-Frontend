import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Usuarioservice } from '../../../services/usuarioservice';

@Component({
  selector: 'app-usuario-reportes',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './usuario-reportes.html',
  styleUrl: './usuario-reportes.css',
})
export class UsuarioReportes implements OnInit {
  constructor(private userS: Usuarioservice) {}
  @ViewChild('chartEstado') chartEstado?: BaseChartDirective;
  @ViewChild('chartIdioma') chartIdioma?: BaseChartDirective;

  hasDataEstado = false;
  hasDataIdioma = false;

  barChartOptionsEstado: ChartOptions = {
    responsive: true,
  };

  barChartOptionsIdioma: ChartOptions = {
    responsive: true,
  };

  barChartLegendEstado = true;
  barChartLegendIdioma = true;

  barChartLabelsEstado: string[] = [];
  barChartLabelsIdioma: string[] = [];

  barChartDataEstado: ChartDataset[] = [];
  barChartDataIdioma: ChartDataset[] = [];
  barChartTypeEstado: ChartType = 'pie';
  barChartTypeIdioma: ChartType = 'bar';

  ngOnInit(): void {
    this.cargarReporteEstado();
    this.cargarReporteIdioma();
  }
  cargarReporteEstado(): void {
    this.userS.estadisticasPorEstado().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.hasDataEstado = true;
          this.barChartLabelsEstado = data.map((item) => item.estado);
          this.barChartDataEstado = [
            {
              data: data.map((item) => item.cantidad),
              label: 'Cantidad de usuarios por estado',
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

  cargarReporteIdioma(): void {
    this.userS.estadisticasPorIdioma().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.hasDataIdioma = true;
          this.barChartLabelsIdioma = data.map((item) => item.idioma);
          this.barChartDataIdioma = [
            {
              data: data.map((item) => item.cantidad),
              label: 'Cantidad de usuarios por Idioma',
              backgroundColor: [
                '#d79404a6',
                '#c8f403e0',
                'rgb(31, 194, 31)',
                'rgba(80, 77, 230, 0.5)',
                'rgb(6, 4, 148)',
              ],
              borderColor: ['#b71c1c', '#c62828', '#8e0000', '#ef5350', '#7f0000'],
              borderWidth: 1,
            },
          ];

          setTimeout(() => {
            this.chartIdioma?.update();
          }, 0);
        } else {
          this.hasDataIdioma = false;
        }
      },
      error: (err) => {
        console.error('Error al cargar estadísticas por Idioma:', err);
        this.hasDataIdioma = false;
      },
    });
  }
}
