import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import { PostComment, createComment } from '@sonder/features/posts/models';
import { CreateCommentGQL, GetPostGQL, GetPostGQLResponse } from '@sonder/features/posts';

@Component({
  selector: 'sonder-new-comment-form',
  templateUrl: './new-comment-form.component.html',
  styleUrls: ['./new-comment-form.component.scss']
})
export class NewCommentFormComponent implements OnInit, OnDestroy {
  commentForm: FormGroup;
  errors$: Observable<object>;

  constructor(
    private createCommentGQL: CreateCommentGQL,
    private getPostGQL: GetPostGQL,
    private formBuilder: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<NewCommentFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { postId: number | string; parentIds: number[] }
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      body: ['', Validators.required]
    });
  }

  addComment() {
    const commentData = {
      ...this.commentForm.value,
      ...this.data
    };

    this.createCommentGQL
      .mutate(commentData, {
        optimisticResponse: {
          __typename: 'Mutation',
          createComment: {
            __typename: 'Comment',
            id: Math.round(Math.random() * -1000000),
            ...commentData
          }
        },
        update: (store, { data: { createComment: createdComment } }) => {
          const query = this.getPostGQL.document;
          const variables = { postId: this.data.postId };
          const data: GetPostGQLResponse = store.readQuery({
            query,
            variables
          });

          data.getPost.comments.push(createdComment);
          store.writeQuery({ query, data });
        }
      })
      .subscribe(() => {
        this.commentForm.reset();
        this.bottomSheetRef.dismiss();
      });
  }

  ngOnDestroy() {
  }
}
