import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, takeUntil, tap, switchMap, filter } from 'rxjs/operators';
import { Observable, of, Subscription, zip, combineLatest } from 'rxjs';

import { Post, PostComment, PostsBaseComponent } from '@sonder/features/posts';
import { NewCommentFormComponent } from '../../containers/new-comment-form/new-comment-form.component';
import { MatBottomSheet } from '@angular/material';

import {
  CommentsQuery,
  PostsQuery,
  PostsService
} from '@sonder/features/posts';
import { ProfilesService } from '@sonder/features/profiles';
import * as _ from 'lodash';

@Component({
  selector: 'sonder-post-show-page',
  templateUrl: './post-show-page.component.html',
  styleUrls: ['./post-show-page.component.scss']
})
export class PostShowPageComponent extends PostsBaseComponent
  implements OnInit {
  post$: Observable<Post>;
  postId: number;
  comments$: Observable<PostComment[]>;
  comments: PostComment[];
  commentsLoaded = false;
  commentsLoaded$: Observable<boolean>;
  commentVotes$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private newCommentBottomSheet: MatBottomSheet,
    private commentsQuery: CommentsQuery,
    private postsQuery: PostsQuery,
    private postsService: PostsService,
    private profilesService: ProfilesService
  ) {
    super();
  }

  ngOnInit() {
    const postId$ = this.route.params.pipe(
      map((params: { postId: string }) => parseInt(params.postId, 10)),
      takeUntil(this.destroy$)
    );

    postId$.subscribe((postId: number) => {
      this.postId = postId;
      this.comments$ = this.commentsQuery.selectPostComments(postId);
      this.commentsLoaded$ = this.commentsQuery.selectPostCommentsLoaded(
        postId
      );
      this.post$ = this.postsQuery.selectEntity(postId);
      this.postsService
        .loadPostWithComments(postId)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
      zip(this.post$, this.comments$).pipe(
        map(([post, comments]: [Post, PostComment[]]) => (
          [(post && post.profileId), ...comments.map(comment => comment.profileId)]
        )),
        map((profileIds) => _.uniq(_.compact(profileIds))),
        filter((profileIds: number[]) => (profileIds.length > 0)),
        switchMap((ids: number[]) => this.profilesService.loadProfiles(ids)),
        takeUntil(this.destroy$)
      ).subscribe();
    });
  }

  openNewCommentBottomSheet() {
    this.newCommentBottomSheet.open(NewCommentFormComponent, {
      data: {
        postId: this.postId,
        parentIds: []
      }
    });
  }
}
