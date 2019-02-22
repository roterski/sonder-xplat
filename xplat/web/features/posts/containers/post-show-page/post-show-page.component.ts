import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Observable, of, Subscription, zip, combineLatest } from 'rxjs';

import { Post, PostComment, PostsBaseComponent } from '@sonder/features/posts';
import { NewCommentFormComponent } from '../../containers/new-comment-form/new-comment-form.component';
import { MatBottomSheet } from '@angular/material';

import {
  CommentsQuery,
  PostsQuery,
  PostsService,
} from '@sonder/features/posts';

@Component({
  selector: 'sonder-post-show-page',
  templateUrl: './post-show-page.component.html',
  styleUrls: ['./post-show-page.component.css']
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
    private postsService: PostsService
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
      this.commentsLoaded$ = this.commentsQuery.selectPostCommentsLoaded(postId);
      this.post$ = this.postsQuery.selectEntity(postId);
      this.postsService
        .loadPostWithComments(postId)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    })
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
