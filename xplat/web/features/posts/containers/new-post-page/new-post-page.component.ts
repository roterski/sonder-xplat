import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  takeUntil,
  exhaustMap,
  switchMap,
  tap,
  filter,
  pluck,
  catchError
} from 'rxjs/operators';
import { of, Observable, Subject, combineLatest } from 'rxjs';
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
import { Profile, ProfilesQuery, ProfilesService } from '@sonder/features/profiles';

@Component({
  selector: 'sonder-new-post-page',
  templateUrl: './new-post-page.component.html',
  styleUrls: ['./new-post-page.component.scss']
})
export class NewPostPageComponent extends PostsBaseComponent implements OnInit {
  createButtonClicks$ = new Subject<Event>();
  postForm: FormGroup;
  profileId: number;
  errors: any;
  post$: Observable<Post>;
  newPostTags$: Observable<Tag[]>;
  myProfiles$: Observable<Profile[]>;
  tags$: Observable<Tag[]>;

  constructor(
    private formBuilder: FormBuilder,
    private formsManager: AkitaNgFormsManager<any>,
    private router: Router,
    private postsService: PostsService,
    private tagsQuery: TagsQuery,
    private tagsService: TagsService,
    private profilesQuery: ProfilesQuery,
    private profilesService: ProfilesService
  ) {
    super();
  }

  ngOnInit() {
    this.createForm();
    this.handleCreate();
    this.newPostTags$ = this.formsManager.selectValue('newPost').pipe(pluck('tags'));
    this.myProfiles$ = this.profilesQuery.selectMyProfiles();
    this.tags$ = this.tagsQuery.selectAll();
    this.tagsService.loadTags().pipe(takeUntil(this.destroy$)).subscribe();
    this.profilesService.loadMyProfiles().pipe(
      takeUntil(this.destroy$),
      filter((profiles: Profile[]) => profiles.length > 0),
      tap((profiles: Profile[]) => (this.profileId = profiles[0].id))
    ).subscribe();
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: [''],
      tags: this.formBuilder.array([]),
      profileId: ['', Validators.required]
    });
    this.formsManager.upsert('newPost', this.postForm, {
      arrControlFactory: {
        tags: () => this.formBuilder.control('')
      }
    });
    this.destroy$.subscribe({ complete: () => this.formsManager.unsubscribe() });
  }

  handleCreate() {
    this.createButtonClicks$
      .pipe(
        tap(() => (this.errors = undefined)),
        switchMap(() => this.newPostTags$),
        exhaustMap((tags: Tag[]) =>
          this.postsService.createPost(
            {
              ...this.postForm.value,
              profileId: this.profileId
            },
            tags)),
        tap(() => this.formsManager.remove('newPost')),
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
