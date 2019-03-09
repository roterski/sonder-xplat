import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CommentsStore, CommentsState } from './comments.store';
import { PostComment } from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentsQuery extends QueryEntity<CommentsState, PostComment> {
  constructor(protected store: CommentsStore) {
    super(store);
  }

  selectPostComments(postId: number): Observable<PostComment[]> {
    return this.selectAll({
      filterBy: (comment: PostComment) => comment.postId === postId
    });
  }

  selectPostCommentsLoaded(postId: number): Observable<boolean> {
    return this.select(
      (state: CommentsState) =>
        !!(
          state.postCommentsLoaded[postId] &&
          state.postCommentsLoaded[postId].loaded
        )
    );
  }
}
