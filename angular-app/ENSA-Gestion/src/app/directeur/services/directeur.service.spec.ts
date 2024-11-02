import { TestBed } from '@angular/core/testing';

import { DirecteurService } from './directeur.service';

describe('DirecteurService', () => {
  let service: DirecteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirecteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
