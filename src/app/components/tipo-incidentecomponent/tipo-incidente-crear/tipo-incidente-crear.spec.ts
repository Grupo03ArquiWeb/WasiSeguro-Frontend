import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoIncidenteCrear } from './tipo-incidente-crear';

describe('TipoIncidenteCrear', () => {
  let component: TipoIncidenteCrear;
  let fixture: ComponentFixture<TipoIncidenteCrear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoIncidenteCrear]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoIncidenteCrear);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
