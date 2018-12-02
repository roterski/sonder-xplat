import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PersistNgFormPlugin, ID } from '@datorama/akita';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import { PostComment, createComment } from '@sonder/features/posts/models';
import {
  PostCommentsQuery,
  PostCommentsService,
  PostCommentsStore
} from '@sonder/features/posts/state';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'sonder-new-comment-form',
  templateUrl: './new-comment-form.component.html',
  styleUrls: ['./new-comment-form.component.scss']
})
export class NewCommentFormComponent implements OnInit, OnDestroy {
  commentForm: FormGroup;
  errors$: Observable<object>;
  persistForm: PersistNgFormPlugin<PostComment>;

  constructor(
    private apollo: Apollo,
    private formBuilder: FormBuilder,
    private postCommentQuery: PostCommentsQuery,
    private postCommentsService: PostCommentsService,
    private postCommentsStore: PostCommentsStore,
    private bottomSheetRef: MatBottomSheetRef<NewCommentFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { postId: ID; parentIds: number[] }
  ) {}

  ngOnInit() {
    this.createForm();
    this.errors$ = this.postCommentQuery.postCommentsError$;
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      body: ['', Validators.required]
    });
    this.persistForm = new PersistNgFormPlugin(
      this.postCommentQuery,
      createComment,
      { formKey: 'newCommentForm' }
    ).setForm(this.commentForm);
  }

  addComment() {
    this.apollo.mutate({
      mutation: gql`
        mutation createComment($body: String!, $parentIds: [Int], $postId: Int) {
          createComment(createCommentInput: { body: $body, parentIds: $parentIds, postId: $postId }) {
            body
          }
        }
      `,
      variables: {
        body: this.commentForm.value.body,
        parentIds: this.data.parentIds,
        postId: this.data.postId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createComment: {
          __typename: 'Comment',
          body: this.commentForm.value.body,
          parentIds: this.data.parentIds,
          postId: this.data.postId
        }
      },
      // update: (proxy, { data: { createComment } }) => {
      //   const data = proxy.readQuery({ query: })
      // }
  }).subscribe((data) => {
      this.bottomSheetRef.dismiss();
      this.persistForm.reset();
    });
    // this.postCommentsService
    //   .addPostComment(this.data.postId, {
    //     ...this.commentForm.value,
    //     parentIds: this.data.parentIds
    //   })
    //   .subscribe(added => {
    //     if (added) {
    //       this.bottomSheetRef.dismiss();
    //       this.postCommentsStore.setPostCommentError();
    //       this.persistForm.reset();
    //     }
    //   });
  }

  ngOnDestroy() {
    if (this.persistForm) {
      this.persistForm.destroy();
    }
  }
}
