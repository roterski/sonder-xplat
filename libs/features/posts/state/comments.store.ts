import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  getInitialActiveState
} from '@datorama/akita';
import { PostComment } from '../models';
import * as _ from 'lodash';

export interface CommentsState extends EntityState<PostComment> {
  postCommentsLoaded: Array<number>;
}

const initialState = {
  ...getInitialActiveState(),
  postCommentsLoaded: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'comments' })
export class CommentsStore extends EntityStore<CommentsState, PostComment> {
  constructor() {
    super(initialState);
  }

  addPostComments(postId: number, comments: PostComment[]) {
    const commentEntities = this.appendChildrenIds(comments);
    this.add(comments.map(({ id }) => commentEntities[id]));
    this.update((state: CommentsState) => {
      const postCommentsLoaded = _.uniq([...state.postCommentsLoaded, postId]);
      return {
        ...state,
        postCommentsLoaded
      }
  })
}


  private appendChildrenIds(comments) {
    return comments.reduce((acc, comment) => {
      acc[comment.id] = {
        childrenIds: [],
        ...comment
      }
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
