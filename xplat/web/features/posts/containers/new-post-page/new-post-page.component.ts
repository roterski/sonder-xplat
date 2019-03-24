import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  takeUntil,
  exhaustMap,
  switchMap,
  tap,
  catchError
} from 'rxjs/operators';
import { of, Observable, Subject } from 'rxjs';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';

import {
  PostsBaseComponent,
  PostsService,
  Post,
  Tag,
  TagsQuery,
  TagsService,
} from '@sonder/features/posts';

export interface NewPostFormState {
  newPost: {
    title: string;
    body: string;
  }
};

@Component({
  selector: 'sonder-new-post-page',
  templateUrl: './new-post-page.component.html',
  styleUrls: ['./new-post-page.component.scss']
})
export class NewPostPageComponent extends PostsBaseComponent implements OnInit {
  createButtonClicks$ = new Subject<Event>();
  postForm: FormGroup;
  errors: any;
  post$: Observable<Post>;
  newPostTags$: Observable<Tag[]>;
  tags$: Observable<Tag[]>;

  constructor(
    private formBuilder: FormBuilder,
    private formsManager: AkitaNgFormsManager<NewPostFormState>,
    private router: Router,
    private postsService: PostsService,
    private tagsQuery: TagsQuery,
    private tagsService: TagsService,
  ) {
    super();
  }

  ngOnInit() {
    this.createForm();
    this.handleCreate();
    this.newPostTags$ = this.tagsQuery.selectNewTags();
    this.tags$ = this.tagsQuery.selectAll();
    this.tagsService.loadTags().pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['']
    });
    this.formsManager.upsert('newPost', this.postForm);
    this.destroy$.subscribe(() => {}, () => {}, () => this.formsManager.unsubscribe());
  }

  handleCreate() {
    this.createButtonClicks$
      .pipe(
        tap(() => (this.errors = undefined)),
        switchMap(() => this.newPostTags$),
        exhaustMap((tags: Tag[]) => this.postsService.createPost(this.postForm.value, tags)),
        catchError((errors, caught$) => {
          this.errors = errors;
          return caught$;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.router.navigate(['/']));
  }

  tagAdded(tag: Tag) {
    this.tagsService.addNewPostTag(tag);
  }

  tagRemoved(tag: Tag) {
    this.tagsService.removeNewPostTag(tag);
  }
}
