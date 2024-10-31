import { TestBed } from '@angular/core/testing';

import { LiencoursService } from './liencours.service';

describe('LiencoursService', () => {
  let service: LiencoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiencoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
