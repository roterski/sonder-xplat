import { Injectable } from '@angular/core';
import { PostCommentsStore } from './post-comments.store';
import { PostsStore } from './posts.store';
import { MyVotesStore } from './my-votes.store';

@Injectable({ providedIn: 'root' })
export class ClearStoresService {

  constructor(
    private postCommentsStore: PostCommentsStore,
    private postsStore: PostsStore,
    private myVotesStore: MyVotesStore) {
  }

  clearStores() {
    this.postsStore.constructor();
    this.postCommentsStore.constructor();
    this.myVotesStore.constructor();
  }
}
