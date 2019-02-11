import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import { PostComment, createComment } from '@sonder/features/posts/models';
import {
  CreateCommentGQL,
  GetPostGQL,
  GetPostGQLResponse,
  PostsBaseComponent
} from '@sonder/features/posts';
import { parseValidationErrors } from '@sonder/features/app-apollo';

@Component({
  selector: 'sonder-new-comment-form',
  templateUrl: './new-comment-form.component.html',
  styleUrls: ['./new-comment-form.component.scss']
})
export class NewCommentFormComponent extends PostsBaseComponent
  implements OnInit {
  commentForm: FormGroup;
  errors: any;

  constructor(
    private createCommentGQL: CreateCommentGQL,
    private getPostGQL: GetPostGQL,
    private formBuilder: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<NewCommentFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public inputData: { postId: number | string; parentIds: number[] }
  ) {
    super();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      body: ['', Validators.required]
    });
  }

  addComment() {
    this.createComment()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.commentForm.reset();
        this.bottomSheetRef.dismiss();
      }, error => (this.errors = parseValidationErrors(error)));
  }

  private createComment(): Observable<any> {
    const commentData = { ...this.commentForm.value, ...this.inputData };

    return this.createCommentGQL.mutate(commentData, {
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
        const variables = { postId: this.inputData.postId };
        const data: GetPostGQLResponse = store.readQuery({
          query,
          variables
        });

        data.getPost.comments.push(createdComment);
        store.writeQuery({ query, data });
      }
    });
  }
}
