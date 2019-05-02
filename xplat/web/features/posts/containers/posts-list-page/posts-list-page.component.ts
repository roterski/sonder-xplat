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
import { Observable, of } from 'rxjs';
import { takeUntil, tap, pluck, map, switchMap, filter, withLatestFrom, take, distinct } from 'rxjs/operators';
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
    this.selectedTags$ = this.tagsQuery.selectPostFilterTags();
    this.setStateFromParams();
    this.posts$ = this.postsQuery.selectAll();
    this.loading$ = this.postsQuery.selectLoading();
    this.postsService
      .loadPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
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
    this.setParamsFromState((tagsFromParams: string[]) =>
      [...tagsFromParams, tag.name]);
  }

  tagRemoved(tag: Tag) {
    this.tagsService.removePostFilterTag(tag);
    this.setParamsFromState((tagsFromParams: string[]) =>
      _.reject(tagsFromParams, (name: string) => name === tag.name));
  }

  setParamsFromState(syncFunc: Function) {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((queryParams: Params) =>
          of(_.get(queryParams, 'tags') || []).pipe(
            map((tagsFromParams: string[]) => syncFunc(tagsFromParams)),
            map(tags => _.flatten(tags)),
            map(tags => _.compact(tags)),
            map(tags => _.uniq(tags)),
            map(tags => ({ ...queryParams, tags }))
          )
        ), distinct(), switchMap((queryParams: Params) =>
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams,
            queryParamsHandling: 'merge'
          })
        ), take(1) )
      .subscribe();
  }

  setStateFromParams() {
    return this.activatedRoute.queryParams
      .pipe(
        switchMap((queryParams) =>
          of(_.get(queryParams, 'tags')|| []).pipe(
            map((tags) => [...(tags)]),
            map(tags => _.flatten(tags)),
            map(tags => _.compact(tags)),
            map(tags => _.uniq(tags))
          )
        ),
        withLatestFrom(this.tagsQuery.selectPostFilterTags().pipe(pluck('name'))),
        filter(([tagsFromParams, tagsFromState]) => !_.isEqual(tagsFromParams, tagsFromState)),
        switchMap(([tagsFromParams, tagsFromState]) => this.tagsService.setPostFilterTags(tagsFromParams)),
        tap(() => this.selectedTags$ = this.tagsQuery.selectPostFilterTags()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
