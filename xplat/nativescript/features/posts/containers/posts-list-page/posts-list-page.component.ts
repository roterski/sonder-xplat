import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil, pluck } from 'rxjs/operators';

import {
  PostsBaseComponent,
  Post,
  PostsService,
  PostsQuery
} from '@sonder/features/posts';

import { RouterExtensions } from 'nativescript-angular/router';
import { AuthService } from '@sonder/features/auth';
@Component({
  moduleId: module.id,
  selector: 'sonder-posts-list-page',
  templateUrl: './posts-list-page.component.html'
})
export class PostsListPageComponent extends PostsBaseComponent
  implements OnInit {
  loading$: Observable<boolean>;
  posts$: Observable<Post[]>;

  constructor(
    private authService: AuthService,
    private routerExtensions: RouterExtensions,
    private postsService: PostsService,
    private postsQuery: PostsQuery
  ) {
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

  logOut() {
    this.authService
      .logOut()
      .subscribe(() =>
        this.routerExtensions.navigate(['/login'], { clearHistory: true })
      );
  }
}
