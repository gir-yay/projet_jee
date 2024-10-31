import { TestBed } from '@angular/core/testing';

import { CoursEnseignantService } from './cours-enseignant.service';

describe('CoursEnseignantService', () => {
  let service: CoursEnseignantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursEnseignantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
