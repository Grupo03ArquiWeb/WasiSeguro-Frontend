import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { IncidenteService } from '../../services/incidente';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.html',
  styleUrls: ['./mapa.css']
})
export class MapaComponent implements AfterViewInit {
  private map!: L.Map;

  constructor(private incidenteService: IncidenteService) { }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([-12.1040, -76.9629], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.incidenteService.listarIncidentes().subscribe({
      next: (data: any[]) => {
        if (Array.isArray(data)) {
          data.forEach(item => {
            if (item.latitud && item.longitud) {
              L.circleMarker([item.latitud, item.longitud], {
                color: '#e74c3c',
                fillColor: '#c0392b',
                fillOpacity: 0.8,
                radius: 10
              }).addTo(this.map)
                .bindPopup(`<b>Incidente:</b> ${item.descripcion}`);
            }
          });
        }
      },
      error: (err) => console.error("Error:", err)
    });

    setTimeout(() => { this.map.invalidateSize(); }, 500);
  }
}