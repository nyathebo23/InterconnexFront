import { TestBed } from '@angular/core/testing';

import { InformateurNationalService } from './informateur-national.service';

describe('InformateurNationalService', () => {
  let service: InformateurNationalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformateurNationalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
