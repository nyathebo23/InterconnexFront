import { TestBed } from '@angular/core/testing';

import { InformateurLocalService } from './informateur-local.service';

describe('InformateurLocalService', () => {
  let service: InformateurLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformateurLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
