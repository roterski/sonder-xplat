import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, getInitialActiveState, ID } from '@datorama/akita';
import { PostComment } from '../models/post-comment.model';

export interface CommentIds {
  ids: Array<ID>;
  loaded: boolean;
}

export interface PostCommentsState extends EntityState<PostComment> {
  commentsByPost: { [postId: number]: CommentIds };
  postCommentError: any;
}

const initialState = {
  ...getInitialActiveState()
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'postComments' })
export class PostCommentsStore extends EntityStore<PostCommentsState, PostComment> {

  constructor() {
    super(initialState);
  }

  addPostComment(comment: PostComment) {
    const parentId = comment.parentIds.slice(-1)[0];

    this.setState((state: PostCommentsState) => {
      let newState = {
        ...state,
        entities: {
          ...state.entities,
          [comment.id]: {
            ...comment,
            childrenIds: []
          }
        },
        ids: [...state.ids, comment.id],
        commentsByPost: {
          ...state.commentsByPost,
          [comment.postId]: {
            ...state.commentsByPost[comment.postId],
            ids: [
              ...state.commentsByPost[comment.postId].ids,
              comment.id
            ]
          }
        }
      };
      if (parentId !== undefined) {
        newState = {
          ...newState,
          entities: {
            ...newState.entities,
            [parentId]: {
              ...newState.entities[parentId],
              childrenIds: [...newState.entities[parentId].childrenIds, comment.id]
            }
          }
        };
      }
      return newState;
    });
  }

  addPostComments(comments: PostComment[], postId: ID) {
    const ids = comments.map((comment: PostComment) => comment.id);

    this.add(comments);
    const entities = this.appendChildrenIds({ ...this.entities});
    this.set(entities);
    this.setState((state: PostCommentsState) => {
      return {
        ...state,
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: {
            loaded: true,
            ids: ids
          }
        }
      };
    });
  }

  appendChildrenIds(entities) {
    const entitiesWithChildren = {};
    Object.keys(entities).forEach((id) => {
      const entity = entities[id];
      entitiesWithChildren[id] = {...entities[id]};
      entitiesWithChildren[id].childrenIds = entitiesWithChildren[id].childrenIds || [];
      const parentId = entities[id].parentIds.slice(-1)[0];
      if (parentId) {
        const childrenIds = [parseInt(id, 10), ...entitiesWithChildren[parentId].childrenIds];
        entitiesWithChildren[parentId].childrenIds = Array.from(new Set(childrenIds)); // unique values
      }
    });
    return entitiesWithChildren;
  }

  setPostCommentError(error = null) {
    this.setState((state: PostCommentsState) => {
      return {
        ...state,
        postCommentError: error
      };
    });
  }
}
