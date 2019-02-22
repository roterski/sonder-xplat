import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef } from '@angular/core';
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
  PostsService,
  PostsBaseComponent
} from '@sonder/features/posts';

@Component({
  selector: 'sonder-new-comment-form',
  templateUrl: './new-comment-form.component.html',
  styleUrls: ['./new-comment-form.component.scss']
})
export class NewCommentFormComponent extends PostsBaseComponent
  implements OnInit {
  commentForm: FormGroup;
  errors: any;
  postId: number;

  constructor(
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<NewCommentFormComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public inputData: { postId: number; parentIds: number[] }
  ) {
    super();
  }

  ngOnInit() {
    this.postId = this.inputData.postId;
    this.createForm();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      body: ['', Validators.required]
    });
  }

  addComment() {
    this.postsService
      .createComment(this.postId, { ...this.commentForm.value, ...this.inputData })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.commentForm.reset();
          this.bottomSheetRef.dismiss();
        },
        (errors) => {
          this.errors = errors;
          this.changeDetectorRef.markForCheck(); // https://github.com/angular/material2/issues/12931
        });
  }
}
