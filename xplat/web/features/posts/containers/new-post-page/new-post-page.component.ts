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

import { CreatePostGQL, GetPostsGQL, GetPostsGQLResponse, PostsBaseComponent } from '@sonder/features/posts';
import { Post, createPost, Tag } from '@sonder/features/posts/models';
import { catchError } from 'rxjs/internal/operators/catchError';
import * as _ from 'lodash';

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
    private createPostGQL: CreatePostGQL,
    private getPostsGQL: GetPostsGQL
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
    this.createPostGQL
      .mutate(this.postForm.value, {
        optimisticResponse: {
          __typename: 'Mutation',
          createPost: {
            __typename: 'Post',
            id: Math.round(Math.random() * -1000000),
            ...this.postForm.value
          }
        },
        update: (store, { data: { createPost: createdPost } }) => {
          const query = this.getPostsGQL.document;
          const data: GetPostsGQLResponse = store.readQuery({ query });

          data.getPosts.push(createdPost);
          store.writeQuery({ query, data });
        }
      })
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe(
        (result) => this.router.navigate(['/']),
        (error) => {
          const errors = _.get(error, 'graphQLErrors[0].message.message');
          if (errors) {
            this.errors = errors.reduce((acc, err) => {
              acc[err.property] = Object.values(err.constraints).join(', ');
              return acc;
            }, {})
          }
      });
  }

  tagAdded(tag: Tag) {
    // this.tagsService.addNewPostTag(tag);
  }

  tagRemoved(tag: Tag) {
    // this.tagsService.removeNewPostTag(tag);
  }

  ngOnDestroy() {
  }
}
