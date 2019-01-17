import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import {
  PostsBaseComponent,
  Post,
  GetPostsGQL,
  GetPostsGQLResponse,
  PostsStore,
  PostsQuery
} from '@sonder/features';
import { ApolloQueryResult } from 'apollo-client';

import { Observable, of } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'sonder-posts-list-page',
  templateUrl: 'posts-list-page.component.html'
})
export class PostsListPageComponent extends PostsBaseComponent
  implements OnInit {
  posts$: Observable<Post[]>;
  loading$ = of(true);

  constructor(
    private apollo: Apollo,
    private getPostsGQL: GetPostsGQL,
    private postsQuery: PostsQuery,
    private postsStore: PostsStore) {
    super();
  }

  ngOnInit() {
    this.posts$ = this.postsQuery.selectAll();
    this.loading$ = this.postsQuery.selectLoading();

    this.getPostsGQL
      .watch()
      .valueChanges.pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((result: ApolloQueryResult<GetPostsGQLResponse>) => {
        this.postsStore.set(result.data.getPosts);
      });
  }
}
