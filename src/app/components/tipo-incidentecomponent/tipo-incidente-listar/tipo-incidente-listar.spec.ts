import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoIncidenteListar } from './tipo-incidente-listar';

describe('TipoIncidenteListar', () => {
  let component: TipoIncidenteListar;
  let fixture: ComponentFixture<TipoIncidenteListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoIncidenteListar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoIncidenteListar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
