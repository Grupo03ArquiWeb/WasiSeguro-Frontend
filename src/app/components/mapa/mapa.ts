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

    const customIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const markerGroup = L.featureGroup();

    this.incidenteService.listarIncidentes().subscribe({
      next: (data: any[]) => {
        if (Array.isArray(data)) {
          data.forEach(item => {
            if (item.latitud && item.longitud) {
              const marker = L.marker([item.latitud, item.longitud], { icon: customIcon })
                .addTo(this.map)
                .bindPopup(`<b>Incidente:</b> ${item.descripcion}`);
              
              markerGroup.addLayer(marker);
            }
          });
          if (markerGroup.getLayers().length > 0) {
            this.map.fitBounds(markerGroup.getBounds().pad(0.2));
          }
        }
      },
      error: (err) => console.error("Error:", err)
    });

    setTimeout(() => { this.map.invalidateSize(); }, 500);
  }
}