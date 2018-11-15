import { Paginator, PaginatorPlugin } from '@datorama/akita';
import { InjectionToken } from '@angular/core';
import { PostsQuery } from './posts.query';
import { Post } from '../models/post.model';

export const POSTS_PAGINATOR = new InjectionToken('POSTS_PAGINATOR');

export function paginatorFactory(postsQuery: PostsQuery) {
  return new PaginatorPlugin<Post>(postsQuery).withControls().withRange();
}

export const postsPaginatorProvider = {
  provide: POSTS_PAGINATOR,
  useFactory: paginatorFactory,
  deps: [PostsQuery]
};
