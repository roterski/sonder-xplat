import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';

import { Post, PostComment, PostsBaseComponent } from '@sonder/features/posts';
import { NewCommentFormComponent } from '../../containers/new-comment-form/new-comment-form.component';
import { MatBottomSheet } from '@angular/material';
import { ApolloQueryResult } from 'apollo-client';

import {
  GetPostGQL,
  GetPostGQLResponse,
  PostWithComments
} from '@sonder/features/posts';

@Component({
  selector: 'sonder-post-show-page',
  templateUrl: './post-show-page.component.html',
  styleUrls: ['./post-show-page.component.css']
})
export class PostShowPageComponent extends PostsBaseComponent implements OnInit {
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
    private getPostGQL: GetPostGQL,
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

      const query$ = this.getPostGQL.watch({ postId }).valueChanges;

      this.post$ = query$.pipe(
        map(
          (result: ApolloQueryResult<GetPostGQLResponse>) =>
            result.data.getPost
        )
      );

      this.commentsLoaded$ = query$.pipe(
        map(
          (result: ApolloQueryResult<GetPostGQLResponse>) => !result.loading
        )
      );

      this.comments$ = this.post$.pipe(
        map((post: PostWithComments) => post.comments)
      );
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
