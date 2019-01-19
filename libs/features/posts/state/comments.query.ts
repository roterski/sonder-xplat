import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CommentsStore, CommentsState } from './comments.store';
import { PostComment } from '../models';

@Injectable({ providedIn: 'root' })
export class CommentsQuery extends QueryEntity<CommentsState, PostComment> {
  constructor(protected store: CommentsStore) {
    super(store);
  }
}
