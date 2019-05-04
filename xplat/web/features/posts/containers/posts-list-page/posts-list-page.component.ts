import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {
  PostsBaseComponent,
  Post,
  PostsQuery,
  PostsService,
  Tag,
  TagsQuery,
  TagsService,
} from '@sonder/features';
import { ProfilesService } from '@sonder/features/profiles/services';
import { Observable, of, zip } from 'rxjs';
import {
  takeUntil,
  tap,
  pluck,
  map,
  switchMap,
  filter,
  distinctUntilChanged,
  withLatestFrom,
  take,
} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'sonder-posts-list-page',
  templateUrl: 'posts-list-page.component.html',
  styleUrls: ['./posts-list-page.component.scss']
})
export class PostsListPageComponent extends PostsBaseComponent
  implements OnInit {
  posts$: Observable<Post[]>;
  profiles$: Observable<any>;
  selectedTags$: Observable<Tag[]>;
  tags$: Observable<Tag[]>;
  tagsFromUrl$: Observable<string[]>;
  loading$ = of(true);

  constructor(
    private postsQuery: PostsQuery,
    private postsService: PostsService,
    private tagsQuery: TagsQuery,
    private tagsService: TagsService,
    private profilesService: ProfilesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.tags$ = this.tagsQuery.selectAll();
    this.tagsFromUrl$ = this.tagsFromUrl();
    this.selectedTags$ = this.selectedTags();
    this.selectedTags$.pipe(
      switchMap((tags: Tag[]) => this.postsService.loadPosts(tags)),
      takeUntil(this.destroy$)
    ).subscribe();

    this.posts$ = this.postsQuery.selectAll();
    this.loading$ = this.postsQuery.selectLoading();
    this.posts$
      .pipe(
        filter((posts: Post[]) => posts.length > 0),
        map((posts: Post[]) => posts.map(post => post.profileId)),
        map((ids: number[]) => _.uniq(ids)),
        switchMap((ids: number[]) => this.profilesService.loadProfiles(ids)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  tagAdded(tag: Tag) {
    this.tagsService.addPostFilterTag(tag);

    const newTags$ = this.tagsFromUrl$.pipe(
      map((tags: string[]) => _.uniq([...tags, tag.name]))
    );
    this.setTagsInUrl(newTags$).subscribe();
  }

  tagRemoved(tag: Tag) {
    this.tagsService.removePostFilterTag(tag);

    const newTags$ = this.tagsFromUrl$.pipe(
      map((tags: string[]) => _.reject(tags, (name: string) => name === tag.name))
    );
    this.setTagsInUrl(newTags$).subscribe();
  }

  setTagsInUrl(newTags$: Observable<string[]>): Observable<any> {
    return zip(newTags$, this.activatedRoute.queryParams).pipe(
      map(([tags, queryParams]: [string[], Params]) => ({...queryParams, tags})),
      switchMap((queryParams: Params) =>
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams,
          queryParamsHandling: 'merge'
        })),
      take(1)
    );
  }

  tagsFromUrl(): Observable<string[]> {
    return this.activatedRoute.queryParams.pipe(
      switchMap(queryParams =>
        of(_.get(queryParams, 'tags', [])).pipe(
          map(tags => _.flatten([tags])),
          map(tags => _.compact(tags)),
          map(tags => _.uniq(tags))
        )
      ),
      distinctUntilChanged((x, y) => _.isEqual(x, y)),
    );
  }

  selectedTags(): Observable<Tag[]> {
    return zip(this.tagsFromUrl$, this.tagsQuery.selectPostFilterTags()).pipe(
      switchMap(([params, state]) => {
        if(!_.isEqual(params, state.map(({ name }) => name))) {
          return this.tagsService.setPostFilterTags(params);
        }
        return of(true);
      }),
      switchMap(() => this.tagsQuery.selectPostFilterTags()),
      distinctUntilChanged((x, y) => _.isEqual(x, y))
    );
  }
}
