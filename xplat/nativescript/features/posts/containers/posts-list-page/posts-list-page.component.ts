import { Component, OnInit } from '@angular/core';
// import { Apollo } from 'apollo-angular';
// import { ApolloQueryResult } from 'apollo-client';

import { Observable } from 'rxjs';
import { takeUntil, pluck } from 'rxjs/operators';

import {
  PostsBaseComponent,
  Post,
  PostsStore,
  PostsApiService,
  PostsQuery
} from '@sonder/features/posts';

import { RouterExtensions } from 'nativescript-angular/router';
import { AuthService } from '@sonder/features/auth';
@Component({
  moduleId: module.id,
  selector: 'sonder-posts-list-page',
  templateUrl: './posts-list-page.component.html'
})
export class PostsListPageComponent extends PostsBaseComponent implements OnInit {
  // posts: Post[];
  // loading = true;
  loading$: Observable<boolean>;
  posts$: Observable<Post[]>;

  constructor(
    private authService: AuthService,
    private routerExtensions: RouterExtensions,
    private postsApiService: PostsApiService,
    private postsStore: PostsStore,
    private postsQuery: PostsQuery) {
    super();
  }

  ngOnInit() {
    this.posts$ = this.postsQuery.selectAll();
    this.loading$ = this.postsQuery.selectLoading();
    this.loadPosts();
  }

  loadPosts() {
    this.postsApiService
      .getPosts()
      .pipe(
        pluck('data'),
        takeUntil(this.destroy$)
      )
      .subscribe((posts) => this.postsStore.set(posts));
  }

  logOut() {
    this.authService.logOut().subscribe(() => this.routerExtensions.navigate(['/login'], { clearHistory: true }));
  }
}
