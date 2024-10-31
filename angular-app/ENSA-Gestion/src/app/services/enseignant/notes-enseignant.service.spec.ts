import { TestBed } from '@angular/core/testing';

import { NotesEnseignantService } from './notes-enseignant.service';

describe('NotesEnseignantService', () => {
  let service: NotesEnseignantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesEnseignantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
