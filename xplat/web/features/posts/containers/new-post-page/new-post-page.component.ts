import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { CreatePostGQL, GetPostsGQL, GetPostsGQLResponse } from '@sonder/features/posts';
import { Post, createPost, Tag } from '@sonder/features/posts/models';

@Component({
  selector: 'sonder-new-post-page',
  templateUrl: './new-post-page.component.html',
  styleUrls: ['./new-post-page.component.css']
})
export class NewPostPageComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  errors$: Observable<object>;
  post$: Observable<Post>;
  newPostTags$: Observable<Tag[]>;
  newPostTags: Tag[];
  tags$: Observable<Tag[]>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private createPostGQL: CreatePostGQL,
    private getPostsGQL: GetPostsGQL,
  ) {}

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
        update: (store, { data: { createPost: createdPost} }) => {
          const query = this.getPostsGQL.document;
          const data: GetPostsGQLResponse = store.readQuery({ query });

          data.getPosts.push(createdPost);
          store.writeQuery({ query, data });
        }
      })
      .subscribe(() => {
        this.router.navigate(['/']);
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
