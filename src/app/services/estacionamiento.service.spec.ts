import { TestBed } from '@angular/core/testing';

import { EstacionamientosService } from './estacionamiento.service';

describe('EstacionamientoService', () => {
  let service: EstacionamientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstacionamientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
