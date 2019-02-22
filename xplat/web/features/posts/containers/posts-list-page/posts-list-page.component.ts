import { Component, OnInit } from '@angular/core';
import {
  PostsBaseComponent,
  Post,
  PostsQuery,
  PostsService,
} from '@sonder/features';
import { Observable, of } from 'rxjs';
import { takeUntil, tap, pluck } from 'rxjs/operators';

@Component({
  selector: 'sonder-posts-list-page',
  templateUrl: 'posts-list-page.component.html'
})
export class PostsListPageComponent extends PostsBaseComponent
  implements OnInit {
  posts$: Observable<Post[]>;
  loading$ = of(true);

  constructor(
    private postsQuery: PostsQuery,
    private postsService: PostsService) {
    super();
  }

  ngOnInit() {
    this.posts$ = this.postsQuery.selectAll();
    this.loading$ = this.postsQuery.selectLoading();
    this.postsService
      .loadPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
