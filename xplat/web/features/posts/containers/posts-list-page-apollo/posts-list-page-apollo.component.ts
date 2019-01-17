import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import {
  PostsBaseComponent,
  Post,
  GetPostsGQL,
  GetPostsGQLResponse
} from '@sonder/features';
import { ApolloQueryResult } from 'apollo-client';

import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sonder-posts-list-page-apollo',
  templateUrl: 'posts-list-page-apollo.component.html'
})
export class PostsListPageApolloComponent extends PostsBaseComponent implements OnInit {
  posts: Post[];
  loading = true;

  constructor(private apollo: Apollo, private getPostsGQL: GetPostsGQL) {
    super();
  }

  ngOnInit() {
    this.getPostsGQL
      .watch()
      .valueChanges
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        (result: ApolloQueryResult<GetPostsGQLResponse>) => {
          this.posts = result.data.getPosts;
          this.loading = result.loading;
        }
      );
  }
}
