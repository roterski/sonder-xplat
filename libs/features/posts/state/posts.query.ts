import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PostsStore, PostsState } from './posts.store';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostsQuery extends QueryEntity<PostsState, Post> {
  constructor(protected store: PostsStore) {
    super(store);
  }
}
