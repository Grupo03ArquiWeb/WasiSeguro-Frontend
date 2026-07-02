import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoIncidenteActualizar } from './tipo-incidente-actualizar';

describe('TipoIncidenteActualizar', () => {
  let component: TipoIncidenteActualizar;
  let fixture: ComponentFixture<TipoIncidenteActualizar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoIncidenteActualizar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoIncidenteActualizar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
