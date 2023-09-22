import { TestBed } from '@angular/core/testing';

import { PythonModelService } from './python-model.service';

describe('PythonModelService', () => {
  let service: PythonModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PythonModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
