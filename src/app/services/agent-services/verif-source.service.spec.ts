import { TestBed } from '@angular/core/testing';

import { VerifSourceService } from './verif-source.service';

describe('VerifSourceService', () => {
  let service: VerifSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
