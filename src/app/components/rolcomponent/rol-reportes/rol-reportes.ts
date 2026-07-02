import { Component, OnInit, ViewChild } from '@angular/core';
import { Rolservice } from '../../../services/rolservice';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rol-reportes',
  imports: [MatIconModule, BaseChartDirective],
  templateUrl: './rol-reportes.html',
  styleUrl: './rol-reportes.css',
})
export class RolReportes implements OnInit{
 constructor(private rS: Rolservice) {}

  @ViewChild('chartRol') chartRol?: BaseChartDirective;

  hasDataRol = false;

  barChartOptionsRol: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  barChartLegendRol = true;
  barChartLabelsRol: string[] = [];
  barChartDataRol: ChartDataset[] = [];
  barChartTypeRol: ChartType = 'bar';

  ngOnInit(): void {
    this.cargarReporteRol();
  }

  cargarReporteRol(): void {
    this.rS.estadisticasPorRol().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.hasDataRol = true;
          this.barChartLabelsRol = data.map((item) => item.rol);
          this.barChartDataRol = [
            {
              data: data.map((item) => item.totalUsuariosActivos),
              label: 'Usuarios activos por rol',
              backgroundColor: [
                'rgba(61, 184, 191, 0.8)',
                'rgba(39, 146, 154, 0.8)',
                'rgba(26, 58, 60, 0.8)',
                'rgba(95, 158, 160, 0.8)',
              ],
              borderColor: [
                '#3db8bf',
                '#27929a',
                '#1a3a3c',
                '#5f9ea0',
              ],
              borderWidth: 2,
            },
          ];

          setTimeout(() => {
            this.chartRol?.update();
          }, 0);
        } else {
          this.hasDataRol = false;
        }
      },
      error: (err) => {
        console.error('Error al cargar estadísticas por rol:', err);
        this.hasDataRol = false;
      },
    });
  }
}
