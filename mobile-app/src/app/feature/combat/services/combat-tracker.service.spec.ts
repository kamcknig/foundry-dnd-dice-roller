import { TestBed } from '@angular/core/testing';

import { CombatTrackerService } from './combat-tracker.service';

describe('CombatTrackerService', () => {
  let service: CombatTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombatTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
