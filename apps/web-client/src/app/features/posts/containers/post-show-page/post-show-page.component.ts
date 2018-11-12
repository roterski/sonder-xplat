import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HashMap } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import {
  PostsService,
  PostCommentsQuery,
  PostCommentsService,
  MyVotesService } from '../../state';
import { Post, PostComment } from '../../models';
import { NewCommentFormComponent } from '../../containers/new-comment-form/new-comment-form.component';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-post-show-page',
  templateUrl: './post-show-page.component.html',
  styleUrls: ['./post-show-page.component.css']
})
export class PostShowPageComponent implements OnInit, OnDestroy {
  post$: Observable<Post>;
  postId: number;
  comments$: Observable<PostComment[]>;
  commentsLoaded$: Observable<boolean>;
  commentEntities$: Observable<HashMap<PostComment>>;
  commentVotes$: Observable<any>;

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private postCommentsQuery: PostCommentsQuery,
    private postCommentsService: PostCommentsService,
    private postsService: PostsService,
    private newCommentBottomSheet: MatBottomSheet,
    private myVotesService: MyVotesService) {
  }

  ngOnInit() {
    const postId$ = this.route.params.pipe(
      map((params: { postId: string }) => parseInt(params.postId, 10))
    );

    this.subscriptions.push(postId$.subscribe((postId: number) => {
      this.postId = postId;
      this.post$ = this.postsService.getPost(postId);
      this.comments$ = this.postCommentsService.getPostComments(postId);
      this.subscriptions.push(this.comments$.subscribe());
      this.commentsLoaded$ = this.postCommentsQuery.selectPostCommentsLoaded(postId);
      this.commentEntities$ = this.postCommentsQuery.postCommentEntities$;
      this.commentVotes$ = this.myVotesService.getMyCommentVotes(postId);
    }));
  }

  openNewCommentBottomSheet() {
    this.newCommentBottomSheet.open(NewCommentFormComponent,
      {
        data: {
          postId: this.postId,
          parentIds: []
        }
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
