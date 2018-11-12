import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PersistNgFormPlugin, ID } from '@datorama/akita';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import { PostComment, createComment } from '../../models';
import { PostCommentsQuery, PostCommentsService, PostCommentsStore } from '../../state';

@Component({
  selector: 'app-new-comment-form',
  templateUrl: './new-comment-form.component.html',
  styleUrls: ['./new-comment-form.component.scss']
})
export class NewCommentFormComponent implements OnInit, OnDestroy {
  commentForm: FormGroup;
  errors$: Observable<object>;
  persistForm: PersistNgFormPlugin<PostComment>;

  constructor(
    private formBuilder: FormBuilder,
    private postCommentQuery: PostCommentsQuery,
    private postCommentsService: PostCommentsService,
    private postCommentsStore: PostCommentsStore,
    private bottomSheetRef: MatBottomSheetRef<NewCommentFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { postId: ID, parentIds: number[] }
  ) { }

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
    this.postCommentsService
      .addPostComment(this.data.postId, { ...this.commentForm.value, parent_ids: this.data.parentIds })
        .subscribe((added) => {
          if (added) {
            this.bottomSheetRef.dismiss();
            this.postCommentsStore.setPostCommentError();
            this.persistForm.reset();
          }
        });
  }

  ngOnDestroy() {
    if (this.persistForm) { this.persistForm.destroy(); }
  }
}
