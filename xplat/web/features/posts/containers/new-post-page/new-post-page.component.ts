import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  PostsBaseComponent,
  PostsService,
  Post,
  Tag
} from '@sonder/features/posts';

@Component({
  selector: 'sonder-new-post-page',
  templateUrl: './new-post-page.component.html',
  styleUrls: ['./new-post-page.component.css']
})
export class NewPostPageComponent extends PostsBaseComponent implements OnInit {
  postForm: FormGroup;
  errors: any;
  post$: Observable<Post>;
  newPostTags$: Observable<Tag[]>;
  newPostTags: Tag[];
  tags$: Observable<Tag[]>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private postsService: PostsService
  ) {
    super();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['']
    });
  }

  addPost() {
    this.postsService
      .createPost(this.postForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (post: Post) => this.router.navigate(['/']),
        errors => (this.errors = errors)
      );
  }

  tagAdded(tag: Tag) {
    // this.tagsService.addNewPostTag(tag);
  }

  tagRemoved(tag: Tag) {
    // this.tagsService.removeNewPostTag(tag);
  }
}
