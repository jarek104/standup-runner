import { TestBed } from '@angular/core/testing';

import { StandupDataService } from './standup-data.service';

describe('StandupDataService', () => {
  let service: StandupDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandupDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
