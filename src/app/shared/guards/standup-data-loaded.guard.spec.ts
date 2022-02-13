import { TestBed } from '@angular/core/testing';

import { StandupDataLoadedGuard } from './standup-data-loaded.guard';

describe('StandupDataLoadedGuard', () => {
  let guard: StandupDataLoadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StandupDataLoadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
