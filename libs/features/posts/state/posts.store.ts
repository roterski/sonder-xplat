import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, getInitialActiveState } from '@datorama/akita';
import { Post } from '../models/post.model';

export interface PostsState extends EntityState<Post> {
  loaded: boolean;
}

const initialState = {
  loading: false,
  loaded: false,
  ...getInitialActiveState()
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'posts' })
export class PostsStore extends EntityStore<PostsState, Post> {

  constructor() {
    super(initialState);
  }

  addPosts(posts: Post[]) {
    this.add(posts);
    this.setLoaded(true);
  }

  setLoaded(loaded: boolean) {
    this.setState((state: PostsState) => {
      return {
        ...state,
        loaded: loaded,
        loading: !loaded
      };
    });
  }
}

