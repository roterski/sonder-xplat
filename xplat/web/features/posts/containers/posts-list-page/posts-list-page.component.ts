import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { PostsListPageBaseComponent, Post } from '@sonder/features';

@Component({
  selector: 'sonder-posts-list-page',
  templateUrl: 'posts-list-page.component.html'
})
export class PostsListPageComponent extends PostsListPageBaseComponent implements OnInit {
  posts: Post[];
  loading = true;

  constructor(private apollo: Apollo) {
    super();
  }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          query {
            getPosts {
              id
              title
            }
          }
        `,
      })
      .valueChanges.subscribe((result) => {
        this.posts = result.data['getPosts'];
        this.loading = result.loading;
      })
  }
}
