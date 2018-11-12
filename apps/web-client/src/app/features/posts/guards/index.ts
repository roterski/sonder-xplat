import { PostLoadedGuard } from './post-loaded.guard';
import { PostsLoadedGuard } from './posts-loaded.guard';
import { PostCommentsLoadedGuard } from './post-comments-loaded.guard';
import { PostVotesLoadedGuard } from './post-votes-loaded.guard';

export const guards: any[] = [
  PostLoadedGuard,
  PostsLoadedGuard,
  PostCommentsLoadedGuard,
  PostVotesLoadedGuard
];

export * from './post-loaded.guard';
export * from './posts-loaded.guard';
export * from './post-comments-loaded.guard';
export * from './post-votes-loaded.guard';
