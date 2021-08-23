import { TestBed } from '@angular/core/testing';

import { AerodromeAgentService } from './aerodrome-agent.service';

describe('AerodromeAgentService', () => {
  let service: AerodromeAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AerodromeAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
