import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { PersistNgFormPlugin } from '@datorama/akita';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  PostsQuery,
  PostsService,
  TagsQuery,
  TagsService
} from '@sonder/features/posts/state';
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
  persistForm: PersistNgFormPlugin<Post>;
  newPostTags$: Observable<Tag[]>;
  newPostTags: Tag[];
  tags$: Observable<Tag[]>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private postsQuery: PostsQuery,
    private postsService: PostsService,
    private tagsQuery: TagsQuery,
    private tagsService: TagsService,
    private createPostGQL: CreatePostGQL,
    private getPostsGQL: GetPostsGQL,
  ) {}

  ngOnInit() {
    this.createForm();
    // this.newPostTags$ = this.tagsQuery.newPostTags$;
    // this.newPostTags$.subscribe(tags => (this.newPostTags = tags));
    // this.errors$ = this.postsQuery.selectError();
    // this.tags$ = this.tagsService.getTags();
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['']
    });
    // this.persistForm = new PersistNgFormPlugin(this.postsQuery, createPost, {
    //   formKey: 'newPostForm'
    // }).setForm(this.postForm);
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
    // this.postsService
    //   .addPost(this.postForm.value, this.newPostTags)
    //   .subscribe(added => {
    //     if (added) {
    //       this.router.navigate(['/']);
    //       this.persistForm.reset();
    //       this.tagsService.clearNewPostTags();
    //     }
    //   });
  }

  tagAdded(tag: Tag) {
    // this.tagsService.addNewPostTag(tag);
  }

  tagRemoved(tag: Tag) {
    // this.tagsService.removeNewPostTag(tag);
  }

  ngOnDestroy() {
    // if (this.persistForm) {
    //   this.persistForm.destroy();
    // }
  }
}
