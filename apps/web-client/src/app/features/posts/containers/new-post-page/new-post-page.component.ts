import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { PersistNgFormPlugin } from '@datorama/akita';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PostsQuery, PostsService, TagsQuery, TagsService } from '../../state';
import { Post, createPost, Tag } from '../../models';

@Component({
  selector: 'app-new-post-page',
  templateUrl: './new-post-page.component.html',
  styleUrls: ['./new-post-page.component.css']
})
export class NewPostPageComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  errors$: Observable<object>;
  post$: Observable<Post>;
  persistForm: PersistNgFormPlugin<Post>;
  newPostTags$: Observable<Tag[]>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private postsQuery: PostsQuery,
    private postsService: PostsService,
    private tagsQuery: TagsQuery,
    private tagsService: TagsService
  ) { }

  ngOnInit() {
    this.createForm();
    this.newPostTags$ = this.tagsQuery.newPostTags$;
    this.errors$ = this.postsQuery.selectError();
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['']
    });
    this.persistForm = new PersistNgFormPlugin(
        this.postsQuery,
        createPost,
        { formKey: 'newPostForm' }
      ).setForm(this.postForm);
  }

  addPost() {
    this.tagsQuery.newPostTags$.pipe(
      switchMap((tags: Tag[]) => this.postsService.addPost(this.postForm.value, tags)),
      take(1)
    ).subscribe((added) => {
      if (added) {
        this.router.navigate(['/']);
        this.persistForm.reset();
        this.tagsService.clearNewPostTags();
      }
    });
  }

  tagAdded(tag: Tag) {
    this.tagsService.addNewPostTag(tag);
  }

  tagRemoved(tag: Tag) {
    this.tagsService.removeNewPostTag(tag);
  }

  ngOnDestroy() {
    if (this.persistForm) { this.persistForm.destroy(); }
  }
}
