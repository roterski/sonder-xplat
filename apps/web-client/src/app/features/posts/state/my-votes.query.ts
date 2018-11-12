import { Injectable } from '@angular/core';
import { Query, ID } from '@datorama/akita';
import { MyVotesStore, MyVotesState } from './my-votes.store';

@Injectable({ providedIn: 'root' })
export class MyVotesQuery extends Query<MyVotesState> {
  myPostVotes$ = this.select((state: MyVotesState) => state.postVotes.votes);
  myPostVotesLoaded$ = this.select((state: MyVotesState) => state.postVotes.loaded);

  constructor(protected store: MyVotesStore) {
    super(store);
  }

  selectCommentVotes(postId: ID) {
    return this.select((state: MyVotesState) => {
      return state.commentVotes[postId] && state.commentVotes[postId].votes;
    });
  }

  selectCommentVotesLoaded(postId: ID) {
    return this.select((state: MyVotesState) => {
      return state.commentVotes[postId] && state.commentVotes[postId].loaded;
    });
  }

  selectCommentVote(postId: ID, commentId: ID) {
    return this.select((state: MyVotesState) => {
      return state.commentVotes[postId] && state.commentVotes[postId].votes[commentId];
    });
  }
}
