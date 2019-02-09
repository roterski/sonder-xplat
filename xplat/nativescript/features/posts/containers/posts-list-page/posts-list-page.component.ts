import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';

import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  PostsBaseComponent,
  Post,
  GetPostsGQL,
  GetPostsGQLResponse
} from '@sonder/features';

@Component({
  moduleId: module.id,
  selector: 'sonder-posts-list-page',
  templateUrl: './posts-list-page.component.html'
})
export class PostsListPageComponent extends PostsBaseComponent implements OnInit {
  posts: Post[];
  loading = true;
  posts$: Observable<Post[]>;

  constructor(private apollo: Apollo, private getPostsGQL: GetPostsGQL) {
    super();
  }

  ngOnInit() {
    this.getPostsGQL
      .watch()
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((result: ApolloQueryResult<GetPostsGQLResponse>) => {
        this.posts = result.data.getPosts;
        this.loading = result.loading;
      });
  }
}
