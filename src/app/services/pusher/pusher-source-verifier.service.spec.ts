import { TestBed } from '@angular/core/testing';

import { PusherSourceVerifierService } from './pusher-source-verifier.service';

describe('PusherSourceVerifierService', () => {
  let service: PusherSourceVerifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PusherSourceVerifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
