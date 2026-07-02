import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// Cambia 'tipo-incidente' por el nombre REAL de tu archivo de servicio
import { TipoIncidenteService } from './tipo-incidenteservice'; 

describe('TipoIncidenteService', () => {
  let service: TipoIncidenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TipoIncidenteService]
    });
    service = TestBed.inject(TipoIncidenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});