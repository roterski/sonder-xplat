import { TestBed, async, inject } from '@angular/core/testing';

import { PostCommentsLoadedGuard } from './post-comments-loaded.guard';

describe('PostCommentsLoadedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostCommentsLoadedGuard]
    });
  });

  it('should ...', inject([PostCommentsLoadedGuard], (guard: PostCommentsLoadedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
