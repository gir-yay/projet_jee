import { TestBed } from '@angular/core/testing';

import { MatiereEnseignantService } from './matiere-enseignant.service';

describe('MatiereEnseignantService', () => {
  let service: MatiereEnseignantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatiereEnseignantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
