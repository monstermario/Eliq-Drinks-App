import { TestBed } from '@angular/core/testing';

import { AutobahnService } from './autobahn.service';

describe('AutobahnService', () => {
  let service: AutobahnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutobahnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
