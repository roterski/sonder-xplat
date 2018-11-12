import { Injectable } from '@angular/core';
import { ID, noop } from '@datorama/akita';
import { MyVotesStore } from './my-votes.store';
import { VotesApiService } from '../services';
import { MyVotesQuery } from './my-votes.query';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MyVotesService {

  constructor(private myVotesStore: MyVotesStore,
              private votesApi: VotesApiService,
              private myVotesQuery: MyVotesQuery) {
  }

  getMyPostVotes() {
    const request = this.votesApi
        .getPostVotes()
        .pipe(
          tap((votes) => this.myVotesStore.addPostVotes(votes))
        );

    return this.myVotesQuery.myPostVotesLoaded$.pipe(
      switchMap((loaded: boolean) => loaded ? noop() : request),
      switchMap(() => this.myVotesQuery.myPostVotes$)
    );
  }

  getMyCommentVotes(postId: ID) {
    const request = this.votesApi
      .getCommentVotes(postId)
      .pipe(
        tap((votes) => this.myVotesStore.addCommentVotes(votes, postId))
      );

    return this.myVotesQuery.selectCommentVotesLoaded(postId).pipe(
      switchMap((loaded: boolean) => loaded ? noop() : request),
      switchMap(() => this.myVotesQuery.selectCommentVotes(postId))
    );
  }

  upvotePost(postId: ID) {
    return this.votesApi
      .upvote('posts', postId)
      .pipe(
        tap(vote => this.myVotesStore.addPostVote(vote))
      );
  }

  downvotePost(postId: ID) {
    return this.votesApi
      .downvote('posts', postId)
      .pipe(
        tap(vote => this.myVotesStore.addPostVote(vote))
      );
  }

  revokePostVote(postId: ID) {
    return this.votesApi
      .revokeVote('posts', postId)
      .pipe(
        tap(vote => this.myVotesStore.addPostVote(vote))
      );
  }

  upvoteComment(postId: ID) {
    return this.votesApi
      .upvote('comments', postId)
      .pipe(
        tap(vote => this.myVotesStore.addCommentVote(vote))
      );
  }

  downvoteComment(postId: ID) {
    return this.votesApi
      .downvote('comments', postId)
      .pipe(
        tap(vote => this.myVotesStore.addCommentVote(vote))
      );
  }

  revokeCommentVote(postId: ID) {
    return this.votesApi
      .revokeVote('comments', postId)
      .pipe(
        tap(vote => this.myVotesStore.addCommentVote(vote))
      );
  }
}
