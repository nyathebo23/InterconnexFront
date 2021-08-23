import { TestBed } from '@angular/core/testing';

import { NationalInformerService } from './national-informer.service';

describe('NationalInformerService', () => {
  let service: NationalInformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalInformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
