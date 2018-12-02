import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Post } from '../models';

export interface AllPostsGQLResponse {
  getPosts: Post[];
}

@Injectable({
  providedIn: 'root',
})

export class AllPostsGQL extends Query<AllPostsGQLResponse> {
  document = gql`
    query allPosts {
      getPosts {
        id
        title
      }
    }
  `;
}
