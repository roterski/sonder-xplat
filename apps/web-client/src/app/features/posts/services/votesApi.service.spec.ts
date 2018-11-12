import { TestBed } from '@angular/core/testing';

import { VotesApiService } from './votesApi.service';

describe('VotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VotesApiService = TestBed.get(VotesApiService);
    expect(service).toBeTruthy();
  });
});
