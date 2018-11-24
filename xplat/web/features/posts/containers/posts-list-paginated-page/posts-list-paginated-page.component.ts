import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { PaginatorPlugin, PaginationResponse } from '@datorama/akita';
import { switchMap, map, tap } from 'rxjs/operators';
import { Post, Tag } from '@sonder/features/posts/models';
import {
  PostsQuery,
  PostsService,
  POSTS_PAGINATOR,
  MyVotesService,
  MyVotesQuery,
  TagsQuery,
  TagsService
} from '@sonder/features/posts/state';

@Component({
  selector: 'sonder-posts-list-page',
  templateUrl: './posts-list-paginated-page.component.html',
  styleUrls: ['./posts-list-paginated-page.component.css']
})
export class PostsListPaginatedPageComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean>;
  public postVotes$: Observable<any>;
  public pagination$: Observable<PaginationResponse<Post>>;
  public postFilterTags$: Observable<Tag[]>;
  public tags$: Observable<Tag[]>;

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
  ) {}

  ngOnInit() {
    this.loading$ = combineLatest(
      this.postsQuery.selectLoading(),
      this.paginatorRef.isLoading$
    ).pipe(map(([storeLoading, pageLoading]) => storeLoading && pageLoading));
    this.postVotes$ = this.myVotesQuery.myPostVotes$;
    this.postFilterTags$ = this.tagsQuery.getPostFilterTags();
    // this.tags$ = this.tagsService.getTags();
    this.pagination$ = combineLatest(
      this.paginatorRef.pageChanges,
      this.postFilterTags$.pipe(tap(_ => this.paginatorRef.clearCache()))
    ).pipe(
      switchMap(([page, tags]) =>
        this.paginatorRef.getPage(() =>
          this.postsService.getPostsPage({ page, perPage: this.perPage }, tags)
        )
      )
    );
    // this.subscriptions.push(this.myVotesService.getMyPostVotes().subscribe());
  }

  tagAdded(tag: Tag) {
    this.tagsService.addPostFilterTag(tag);
  }

  tagRemoved(tag: Tag) {
    this.tagsService.removePostFilterTag(tag);
  }

  pageChanged(event: PageEvent) {
    event.pageIndex - event.previousPageIndex > 0
      ? this.paginatorRef.nextPage()
      : this.paginatorRef.prevPage();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
    this.paginatorRef.destroy();
  }
}
