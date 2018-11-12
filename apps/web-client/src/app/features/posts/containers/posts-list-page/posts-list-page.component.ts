import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { PaginatorPlugin, PaginationResponse } from '@datorama/akita';
import { switchMap, map, combineLatest, tap } from 'rxjs/operators';
import { Post, Tag } from '../../models';
import {
  PostsQuery,
  PostsService,
  POSTS_PAGINATOR,
  MyVotesService,
  MyVotesQuery,
  TagsQuery,
  TagsService } from '../../state';

@Component({
  selector: 'app-posts-list-page',
  templateUrl: './posts-list-page.component.html',
  styleUrls: ['./posts-list-page.component.css']
})
export class PostsListPageComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean>;
  public postVotes$: Observable<any>;
  public pagination$: Observable<PaginationResponse<Post>>;
  public postFilterTags$: Observable<Tag[]>;

  private perPage = 100;
  private subscriptions: Subscription[] = [];

  constructor(
    private postsQuery: PostsQuery,
    private postsService: PostsService,
    @Inject(POSTS_PAGINATOR) private paginatorRef: PaginatorPlugin<Post>,
    private myVotesService: MyVotesService,
    private myVotesQuery: MyVotesQuery,
    private tagsQuery: TagsQuery,
    private tagsService: TagsService
  ) { }

  ngOnInit() {
    this.loading$ = this.postsQuery.selectLoading().pipe(
      combineLatest(this.paginatorRef.isLoading$),
      map(([storeLoading, pageLoading]) => storeLoading && pageLoading)
    );
    this.postVotes$ = this.myVotesQuery.myPostVotes$;
    this.postFilterTags$ = this.tagsQuery.getPostFilterTags();
    this.pagination$ = this.paginatorRef.pageChanges.pipe(
      combineLatest(
        this.postFilterTags$.pipe(
          tap(_ => this.paginatorRef.clearCache())
        )
      ),
      switchMap(([page, tags]) => {
        return this.paginatorRef.getPage(() => {
          return this.postsService.getPostsPage({ page, tags, perPage: this.perPage });
        });
      })
    );
    this.subscriptions.push(this.myVotesService.getMyPostVotes().subscribe());
  }

  tagAdded(tag: Tag) {
    this.tagsService.addPostFilterTag(tag);
  }

  tagRemoved(tag: Tag) {
    this.tagsService.removePostFilterTag(tag);
  }

  pageChanged(event: PageEvent) {
    event.pageIndex - event.previousPageIndex > 0 ? this.paginatorRef.nextPage() : this.paginatorRef.prevPage();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    this.paginatorRef.destroy();
  }
}
