import { TestBed } from '@angular/core/testing';

import { AgentSourceService } from './agent-source.service';

describe('AgentSourceService', () => {
  let service: AgentSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
