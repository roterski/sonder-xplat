import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  getInitialEntitiesState
} from '@datorama/akita';
import { Post } from '../models/post.model';

export interface PostsState extends EntityState<Post> {}

const initialState = {
  ...getInitialEntitiesState()
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'posts' })
export class PostsStore extends EntityStore<PostsState, Post> {
  constructor() {
    super(initialState);
  }
}
