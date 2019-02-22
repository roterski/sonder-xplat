import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  getInitialActiveState
} from '@datorama/akita';
import { Post } from '../models/post.model';

export interface PostsState extends EntityState<Post> {
}

const initialState = {
  ...getInitialActiveState()
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'posts' })
export class PostsStore extends EntityStore<PostsState, Post> {
  constructor() {
    super(initialState);
  }
}
