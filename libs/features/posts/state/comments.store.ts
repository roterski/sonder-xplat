import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  getInitialActiveState,
  transaction
} from '@datorama/akita';
import { PostComment } from '../models';
import * as _ from 'lodash';

export interface CommentIds {
  postId: number;
  ids: Array<number>;
  loaded: boolean;
}

export interface CommentsState extends EntityState<PostComment> {
  postCommentsLoaded: { [postId: number]: CommentIds };
}

const initialState = {
  ...getInitialActiveState(),
  postCommentsLoaded: {}
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'comments' })
export class CommentsStore extends EntityStore<CommentsState, PostComment> {
  constructor() {
    super(initialState);
  }

  @transaction()
  addPostComments(postId: number, comments: PostComment[]) {
    postId = Number(postId);
    const commentEntities = this.appendChildrenIds(comments);
    this.add(comments.map(({ id }) => commentEntities[id]));
    this.updateRoot((state: CommentsState) => ({
      ...state,
      postCommentsLoaded: {
        ...state.postCommentsLoaded,
        [postId]: {
          postId,
          ids: comments.map(c => c.id),
          loaded: true
        }
      }
    }));
  }

  private appendChildrenIds(comments) {
    return comments.reduce((acc, comment) => {
      acc[comment.id] = {
        childrenIds: [],
        ...comment
      };
      const parentId = comment.parentIds.slice(-1)[0];
      if (parentId) {
        acc[parentId].childrenIds = Array.from(
          new Set([...acc[parentId].childrenIds, comment.id])
        );
      }
      return acc;
    }, {});
  }
}
