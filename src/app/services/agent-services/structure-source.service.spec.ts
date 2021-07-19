import { TestBed } from '@angular/core/testing';

import { StructureSourceService } from './structure-source.service';

describe('StructureSourceService', () => {
  let service: StructureSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StructureSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
