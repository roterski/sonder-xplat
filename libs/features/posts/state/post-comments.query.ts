import { Injectable } from '@angular/core';
import { QueryEntity, ID } from '@datorama/akita';
import { PostCommentsStore, PostCommentsState } from './post-comments.store';
import { PostComment } from '../models/post-comment.model';
import { Observable, of } from 'rxjs';
import { map, switchMap, combineLatest } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostCommentsQuery extends QueryEntity<PostCommentsState, PostComment> {
  postCommentEntities$ = this.select((state: PostCommentsState) => state.entities);
  postCommentsError$ = this.select((state: PostCommentsState) => state.postCommentError);

  constructor(protected store: PostCommentsStore) {
    super(store);
  }

  selectPostCommentsLoaded(postId: ID): Observable<boolean> {
    return this.select((state: PostCommentsState) => {
      return state.commentsByPost && state.commentsByPost[postId] && state.commentsByPost[postId].loaded;
    });
  }

  selectPostCommentsIds(postId: ID) {
    return this.select((state: PostCommentsState) => {
      return state.commentsByPost && state.commentsByPost[postId] && state.commentsByPost[postId].ids;
    });
  }

  selectPostParentComments(postId: ID) {
    return this.selectPostCommentsIds(postId).pipe(
      combineLatest(this.postCommentEntities$),
      map(([ids, entities], index) => (ids || []) && ids.map((id: ID) => entities[id])),
      map(comments => comments.filter(comment => comment && comment.parentIds.length === 0))
    );
  }
}
