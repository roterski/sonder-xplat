import { Injectable, Inject } from '@angular/core';
import { SessionStore } from './session.store';
import { ClearStoresService } from '../../posts/state/clear-stores.service';
import { POSTS_PAGINATOR } from '../../posts/state/posts.paginator';
import { Post } from '../../posts/models';
import { PaginatorPlugin } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class LogOutService {

  constructor(
    private sessionStore: SessionStore,
    @Inject(POSTS_PAGINATOR) private paginatorRef: PaginatorPlugin<Post>,
    private clearStoresService: ClearStoresService) {
  }

  logOut() {
    this.paginatorRef.clearCache();
    this.sessionStore.logOut();
    this.clearStoresService.clearStores();
  }
}
