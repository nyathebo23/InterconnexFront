import { TestBed } from '@angular/core/testing';

import { PusherNationalInformerService } from './pusher-national-informer.service';

describe('PusherNationalInformerService', () => {
  let service: PusherNationalInformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PusherNationalInformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
