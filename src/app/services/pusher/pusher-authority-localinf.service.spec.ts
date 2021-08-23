import { TestBed } from '@angular/core/testing';

import { PusherAuthorityLocalinfService } from './pusher-authority-localinf.service';

describe('PusherAuthorityLocalinfService', () => {
  let service: PusherAuthorityLocalinfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PusherAuthorityLocalinfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
