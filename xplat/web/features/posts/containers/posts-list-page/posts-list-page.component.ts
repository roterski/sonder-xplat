import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { PostsListPageBaseComponent, Post, AllPostsGQL, AllPostsGQLResponse } from '@sonder/features';
import { ApolloQueryResult } from 'apollo-client';

@Component({
  selector: 'sonder-posts-list-page',
  templateUrl: 'posts-list-page.component.html'
})
export class PostsListPageComponent extends PostsListPageBaseComponent implements OnInit {
  posts: Post[];
  loading = true;

  constructor(private apollo: Apollo, private allPostsGQL: AllPostsGQL) {
    super();
  }

  ngOnInit() {
    this.allPostsGQL.watch()
      .valueChanges
      .subscribe((result: ApolloQueryResult<AllPostsGQLResponse>) => {
        this.posts = result.data.getPosts;
        this.loading = result.loading;
      })
  }
}
