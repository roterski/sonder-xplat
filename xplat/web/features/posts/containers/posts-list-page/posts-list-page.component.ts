import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import {
  PostsListPageBaseComponent,
  Post,
  GetPostsGQL,
  GetPostsGQLResponse
} from '@sonder/features';
import { ApolloQueryResult } from 'apollo-client';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'sonder-posts-list-page',
  templateUrl: 'posts-list-page.component.html'
})
export class PostsListPageComponent extends PostsListPageBaseComponent
  implements OnInit {
  posts: Post[];
  loading = true;
  posts$: Observable<Post[]>;

  constructor(private apollo: Apollo, private getPostsGQL: GetPostsGQL) {
    super();
  }

  ngOnInit() {
    this.getPostsGQL
      .watch()
      .valueChanges.subscribe(
        (result: ApolloQueryResult<GetPostsGQLResponse>) => {
          this.posts = result.data.getPosts;
          this.loading = result.loading;
        }
      );
  }
}
