import { TestBed } from '@angular/core/testing';

import { AerodromeLocalAgentService } from './aerodrome-local-agent.service';

describe('AerodromeLocalAgentService', () => {
  let service: AerodromeLocalAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AerodromeLocalAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
